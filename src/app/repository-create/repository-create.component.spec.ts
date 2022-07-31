import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoryCreateComponent } from './repository-create.component';

describe('RepositoryCreateComponent', () => {
  let component: RepositoryCreateComponent;
  let fixture: ComponentFixture<RepositoryCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepositoryCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepositoryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
