import { Component, OnInit } from '@angular/core';
import { PageService } from '../../page.service';
import { NavItem } from '../../../models/navitem';
import { SettingsService } from '../../settings.service';

@Component({
  selector: 'navigation-editor',
  templateUrl: './navigation-editor.component.html',
  styleUrls: ['./navigation-editor.component.scss']
})
export class NavigationEditorComponent implements OnInit {

  constructor(
    private pageService:PageService,
    private settingsService:SettingsService
  ) {}

  ngOnInit() {
    this.getPages();

    this.settingsService.GetSetting("mainpage")
    .subscribe(data =>{
      this.navData.mainpage = data.setting_value
    })

    this.settingsService.GetSetting("nav_items")
    .subscribe(data =>{
      this.navData.nav_items = JSON.parse(data.setting_value);
      console.log(JSON.parse(data.setting_value));
      console.log(this.navData.nav_items);
    })

  }

  pageData;
  saving = false
  navData = {
    mainpage:null,
    nav_items:[]
  };

  onAddMenuItem(){

    let navItem = new NavItem();
    navItem.name = null;
    navItem.target = null;

    this.navData.nav_items.push(navItem);
    console.log(this.navData);
  }

  onNavItemChange(value){
    this.updateNavData(value.index, value.navItem);
  }

  updateNavData(index,data:NavItem){
    // FIX ME: Resets menuitems when updating.. 
      this.navData.nav_items[index].name =  data.name;
      this.navData.nav_items[index].target =  data.target;
      console.log(this.navData.nav_items);
  }

  onSave(){
    this.saving = true
    console.log(this.navData);
    this.navData.nav_items = this.navData.nav_items.filter(x => {
      return x.name != null 
    })
    this.settingsService.SetSetting("nav_items", JSON.stringify(this.navData.nav_items))
    .subscribe(response =>{
      setTimeout(() =>{this.saving = false}, 400)
    })
    this.settingsService.SetSetting("mainpage", parseInt(this.navData.mainpage))
    .subscribe(x => {
    })
  }

  onDeleteNavItem(e){
    console.log(e);
    this.navData.nav_items.splice(e,1)
  }

  getPages(){
    this.pageService.GetAllPages()
    .subscribe(data =>{
      this.pageData = data;
    })
  }

}
