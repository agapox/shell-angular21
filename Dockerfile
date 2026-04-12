# Dockerfile for shell-angular21 security analysis with Trivy and SonarQube

# Base stage
FROM node:20-slim AS base

WORKDIR /shell-angular21

# Copy source code
COPY . .


# --- Trivy stage ---
FROM aquasec/trivy:0.69.3 AS trivy

# Copy source from previous stage
COPY --from=base /shell-angular21 /shell-angular21
WORKDIR /shell-angular21

# Crear carpeta para reportes
RUN mkdir -p /shell-angular21/trivy
RUN rm -f /shell-angular21/trivy/*

# Escaneo de vulnerabilidades (incluye devDependencies) una sola vez en JSON
RUN trivy fs \
  --exit-code 0 \
  --scanners vuln \
  --severity LOW,MEDIUM,HIGH,CRITICAL \
  --include-dev-deps \
  --format json \
  --output /shell-angular21/trivy/trivy-results.json \
  --skip-dirs /shell-angular21/trivy \
  /shell-angular21

# Convertir JSON a tabla para lectura humana (evita un segundo escaneo)
RUN trivy convert \
  --format table \
  --scanners vuln \
  --severity LOW,MEDIUM,HIGH,CRITICAL \
  --output /shell-angular21/trivy/trivy-results.txt \
  /shell-angular21/trivy/trivy-results.json

# Escaneo de secretos separado (sin node_modules ni artefactos de build/reportes)
RUN trivy fs \
  --exit-code 0 \
  --scanners secret \
  --format json \
  --output /shell-angular21/trivy/trivy-secrets-results.json \
  --skip-dirs /shell-angular21/node_modules \
  --skip-dirs /shell-angular21/dist \
  --skip-dirs /shell-angular21/trivy \
  /shell-angular21

RUN trivy convert \
  --format table \
  --scanners secret \
  --output /shell-angular21/trivy/trivy-secrets-results.txt \
  /shell-angular21/trivy/trivy-secrets-results.json

# Compatibilidad con nombres legacy consumidos por pipelines existentes
RUN cp /shell-angular21/trivy/trivy-results.json /shell-angular21/trivy/trivy-dist-results.json
RUN cp /shell-angular21/trivy/trivy-results.txt /shell-angular21/trivy/trivy-dist-results.txt


# --- SonarQube stage (optional, requires sonar-scanner config) ---
# Uncomment below to enable SonarQube analysis
# FROM sonarsource/sonar-scanner-cli:latest AS sonarqube
# COPY --from=base /shell-angular21 /shell-angular21
# WORKDIR /shell-angular21
# COPY sonar-project.properties ./
# RUN sonar-scanner

# Final stage: just for inspection
FROM node:20-slim
WORKDIR /shell-angular21
COPY --from=base /shell-angular21 /shell-angular21
COPY --from=trivy /shell-angular21/trivy /shell-angular21/trivy
# COPY --from=sonarqube /shell-angular21/.scannerwork /shell-angular21/.scannerwork

CMD ["true"]
