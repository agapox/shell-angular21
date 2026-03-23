import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mfe21Host } from './mfe21-host';

describe('Mfe21Host', () => {
  let component: Mfe21Host;
  let fixture: ComponentFixture<Mfe21Host>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mfe21Host],
    }).compileComponents();

    fixture = TestBed.createComponent(Mfe21Host);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
