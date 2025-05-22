import { Component, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { ListKeyManager } from '@angular/cdk/a11y';
import { first } from 'rxjs';
import {DOWN_ARROW, ENTER, UP_ARROW} from "@angular/cdk/keycodes";
import { UserListItemComponent } from './user-list-item.component';
import { IndicadorService } from '../../../core/services/Indicador.service';

@Component({
  selector: 'app-autocomplete-user',
  templateUrl: './autocomplete-user.component.html',
  styleUrl: './autocomplete-user.component.scss',
})
export class AutocompleteUserComponent implements OnInit{

  dataList:any[] = [];
  public searchCode!: boolean;
  listKeyManager!: ListKeyManager<any>;
  searchQuery: string = '';

  @Input() set dataPatch(data: any) {
    if (data) {
      this.searchQuery = data;
    }
  }

  @Output() userSelected = new EventEmitter();
  @ViewChildren(UserListItemComponent) listItems!: QueryList<UserListItemComponent>;


  constructor(private indicadorService: IndicadorService) {
    this.searchCode = true;
  }

  ngOnInit() {
  }

  showUserInfo(item: any) {
    if (item.id) {
      this.userSelected.emit(item);
      this.dataList = [];
    }
    this.searchQuery = '';
  }

  onBlur(event: any) {
    if (event.isTrusted) {
      const s = setTimeout(() => {
        this.dataList = [];
        clearTimeout(s);
      }, 300);
    }
  }


  handleKeyUp(event: KeyboardEvent):any {
    event.stopImmediatePropagation();
    if (this.listKeyManager) {
      if (event.keyCode === DOWN_ARROW || event.keyCode === UP_ARROW) {
        this.listKeyManager.onKeydown(event);
        return false;
      } else if (event.keyCode === ENTER && this.listKeyManager.activeItem) {
        this.listKeyManager.activeItem.selectItem();
        return false;
      }
    }
    if (this.searchQuery) {
      this.listData(this.searchQuery);
    } else {
      this.dataList = [];
    }
  }

  public listData(textSearch: string) {
    this.searchCode = false;
    const params: any = {};
    params.name = textSearch;
    if (params.name.length > 4) {
      this.indicadorService.getUsuarioAutocomplete(params.name)
        .pipe(first())
        .subscribe(res => {
          this.dataList = res || [];
          this.listKeyManager = new ListKeyManager<any>(this.listItems);
          this.initKeyManagerHandlers();
        });
    }
  }

  initKeyManagerHandlers() {
    this.listKeyManager
      .change
      .subscribe((activeIndex) => {
        this.listItems.map((item, index) => {
          item.setActive(activeIndex === index);
          return item;
        });
      });
  }

}
