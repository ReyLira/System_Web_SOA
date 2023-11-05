import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {TeenService} from "../../../components/component-funcionality/services/teen/teen.service";
import {
  OperativeUnitService
} from 'src/app/components/component-funcionality/services/operativeUnit/operative-unit.service';
import {Teen} from "../../../components/component-funcionality/models/teen/teen.model";

@Component({
  selector: 'app-transfer-dashboard-info',
  templateUrl: './transfer-dashboard-info.component.html',
  styleUrls: ['./transfer-dashboard-info.component.scss']
})
export class TransferDashboardInfoComponent implements OnInit {

  showTransferForm = false;
  teenData: any[] = [];
  operativeUnitData: any[] = [];
  formForTransfer: FormGroup = new FormGroup({});

  constructor(private _teenService: TeenService,
              private _operativeUnitService: OperativeUnitService,
              private _fb: FormBuilder
  ) {
    this.formForTransfer = this._fb.group({
      id_teen: [''],
      id_operativeunit: [''],
    });
  }

  ngOnInit(): void {
    this.findAllDataTeen();
    this.findAllDataOperativeUnit();
  }

  showForm() {
    this.showTransferForm = true;
  }

  hideForm() {
    this.showTransferForm = false;
  }

  onSubmitForm() {
    const idTeenSelectedOfForm = this.formForTransfer.get('id_teen')?.value;
    const idOperativeUnitSelectedOfForm = this.formForTransfer.get('id_operativeunit')?.value;

    const selectedTeenInForm = this.teenData.find((item) => item.id_teen === idTeenSelectedOfForm);

    const teen: Teen = {
      id_teen: idTeenSelectedOfForm,
      name: selectedTeenInForm.name,
      surnameFather: selectedTeenInForm.surnameFather,
      surnameMother: selectedTeenInForm.surnameMother,
      dni: selectedTeenInForm.dni,
      phoneNumber: selectedTeenInForm.phoneNumber,
      address: selectedTeenInForm.address,
      email: selectedTeenInForm.email,
      birthade: selectedTeenInForm.birthade,
      gender: selectedTeenInForm.gender,
      id_operativeunit: idOperativeUnitSelectedOfForm,
      crimeCommitted: selectedTeenInForm.crimeCommitted,
      id_attorney: selectedTeenInForm.id_attorney,
      codubi: selectedTeenInForm.codubi,
      status: selectedTeenInForm.status,
    };

    this._teenService.transferDataTeen(teen).subscribe((dataTeenTransfer) => {
      console.log('Teen Transfer: ', dataTeenTransfer);
      this.hideForm();
    })

    this._teenService.saveNewTeen(teen).subscribe((dataTeenSave) => {
      console.log('Teen Save: ', dataTeenSave);
      window.location.reload();
    });
  }

  findAllDataTeen() {
    this._teenService
      .finAllDataTeenActive()
      .subscribe((dataReceivedTeen: any) => {
        console.log('Data teen: ', dataReceivedTeen);
        this.teenData = dataReceivedTeen;
      });
  }

  findAllDataOperativeUnit() {
    this._operativeUnitService
      .findAllDataOperativeUnit()
      .subscribe((dataReceivedOperativeUnit: any) => {
        this.operativeUnitData = dataReceivedOperativeUnit;
      });
  }

}