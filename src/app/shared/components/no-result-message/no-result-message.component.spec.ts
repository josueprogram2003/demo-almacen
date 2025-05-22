import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoResultMessageComponent } from './no-result-message.component';

describe('NoResultMessageComponent', () => {
  let component: NoResultMessageComponent;
  let fixture: ComponentFixture<NoResultMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoResultMessageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoResultMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
