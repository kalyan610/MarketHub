import * as React from 'react';
import styles from './MarketHub.module.scss';
import Service from './Service';
import type { IMarketHubProps } from './IMarketHubProps';
import {Stack,IStackStyles} from 'office-ui-fabric-react'; 
import { Dropdown,IDropdownStyles,IDropdownOption} from 'office-ui-fabric-react/lib/Dropdown';
import { ChoiceGroup,IChoiceGroupOption} from 'office-ui-fabric-react/lib/ChoiceGroup';
const stackTokens = { childrenGap: 50 };
import { ComboBox,IComboBoxOption,IComboBoxStyles } from 'office-ui-fabric-react/lib/ComboBox';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import {PrimaryButton } from 'office-ui-fabric-react/lib/Button';

import { DatePicker } from 'office-ui-fabric-react/lib/DatePicker';
import {Icon} from 'office-ui-fabric-react/lib/Icon';

import { TextField } from '@fluentui/react/lib/TextField';
//cls
// import { Item } from '@pnp/sp/items';

const stackStyles: Partial<IStackStyles> = { root: { padding: 10} };
const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 },
};


const comboBoxStyles: Partial<IComboBoxStyles> = { root: { maxWidth: 300 } };

const WiproSynergyOptions: IChoiceGroupOption[] = 

[ { key: "Yes", text: "Yes" },
  { key: "No", text: "No" }];  


//var DomainSelectArray:any=[];

//var MyTestArray=["1","2","3"];

//let numberArray1:any=[];

//let numberArray = MyTestArray.map(Number);

let ContentType='';

let Contact='';

let myitemId='';

let AllDomainsFinalSavedValue='';
let AllDomainsFinalSavedIDValue='';

var AllDomainSavedValues:any=[];
var AllDomainsSavedIDValues:any=[];


var AllDomainsSelected:any=[];

var AllSubDomains: any = [];
let AllSubDomainsFinalIDValue='';
let AllSubDomainsFinalTextValues='';
var AllSubDomainSavedIDValues:any=[];
var AllSubDomainSavedTextValues:any=[];
var AllSubDomainsSelected:any=[];

var AllServiceGroups: any = [];
let AllServiceGroupsFinalSavedValue='';
let AllServiceGroupsFinalSavedIDValue='';
let AllServiceGroupsSavedValues:any=[];
let AllServiceGroupsSavedIDValues:any=[];
var AllServiceGroupsSelected:any=[];

var AllServices: any = [];
let AllServiceFinalSavedValue='';
let AllServiceFinalSavedIDValue='';
let AllServicesSavedTextValues:any=[];
let AllServicesSavedIDValues:any=[];
var AllServicesSelected:any=[];

let AllRegionsFinalSavedValue='';
let AllRegionsFinalSavedIDValue='';
let AllRegionSavedValues:any=[];
let AllRegionsSavedIDValues:any=[];
var AllRegionsSelected:any=[];
var AllCountriesSelected:any=[];

var AllCountries: any=[];
let AllCountrySavedValues:any=[];
let AllCountrySavedIDValues:any=[];
let  AllCountryFinalSavedValue:any=[];
let AllCountryFinalSavedIDValue:any=[];


//let MyTest:any=[];

const stackButtonStyles: Partial<IStackStyles> = { root: { width: 20 } };

export interface IMarketHub

{

Name:any;
ContentTypeItems:any;
MyContentTypeValue:any;

DomainItems:any;
SubDomainItems:any;

ServiceGroupItems:any;
ServicesItems:any;

RegionItems:any;
CountryItems:any;

Clientname:any;
ContactId:any;
WiproSynergy:any;
WiproSynergyKey:any;

dtLastReview:any;
desc:any;

keywords:any;
FileValuerecived:any;
disableFileUploadrecived:boolean;

contentypeKey:any;

AttachmentFiles:any;

DomainSelectArray:any;
DomainSelectedTextArray:any;

SubDomainSelectedArray:any;


}

export default class MarketHub extends React.Component<IMarketHubProps,IMarketHub> {

  public _service: any;
  public GlobalService1: any;
  protected ppl:any;

    public constructor(props:IMarketHubProps) {

    super(props);
    
    this.state={

     Name:"",
     ContentTypeItems:[],
     MyContentTypeValue:"",

     DomainItems:[],
     SubDomainItems:[],

     ServiceGroupItems:[],
     ServicesItems:[],

     RegionItems:[],
     CountryItems:[],

     Clientname:"",
     ContactId:[],
     WiproSynergy:"",
     WiproSynergyKey:"",
     dtLastReview:"",
     desc:"",
     keywords:"",
     FileValuerecived:[],
     disableFileUploadrecived:false,
     contentypeKey:"",
     AttachmentFiles:[],
     DomainSelectArray:[],
     DomainSelectedTextArray:[],
     SubDomainSelectedArray:[]


    };

     this._service = new Service(this.props.url, this.props.context);
    
     this.GlobalService1 = new Service(this.props.url, this.props.context);

     this.GeRecrords();
  }


   public async GeRecrords()
     {

    myitemId = this.getParam('SID');

    

     if(myitemId!="")
     {

      this.GetAllConeteTypes();
      this.GetAllDomains();

    let ItemInfo = await this._service.getItemByID(myitemId);

    this.setState({AttachmentFiles:ItemInfo.AttachmentFiles})
    this.setState({Name: ItemInfo.Name });
    this.setState({MyContentTypeValue:ItemInfo.ReqcontenttypeID});
    this.setState({Clientname:ItemInfo.Client});
    this.setState({ContactId:ItemInfo.ContactPerson.EMail})
    this.setState({desc:ItemInfo.Description})
    this.setState({keywords:ItemInfo.Keywords})
    
     if(ItemInfo.WiproSynergy=="No")
     {

      this.setState({WiproSynergyKey:"No"})

     }

     else

      {

         this.setState({WiproSynergyKey:"Yes"})
      }
     

      //Domains


    //const stringDomainsArray = ItemInfo.DomainIDS.split(',');

    this.setState({DomainSelectArray:ItemInfo.DomainIDS.split(',').map(Number)});
    this.setState({DomainSelectedTextArray:ItemInfo.Domains.split(',')});

    this.handleDomainsTest(this.state.DomainSelectArray);

      AllDomainsFinalSavedValue = ItemInfo.Domains;
      AllDomainsFinalSavedIDValue=ItemInfo.DomainIDS;

        //AllDomainSavedValues=ItemInfo.Domains;
      //AllDomainsSavedIDValues=ItemInfo.DomainIDS;



      //const AllDomainstingValues: string[]=AllDomainSavedValues;
      //const AllDomainIDvalues:string[]=AllDomainsSavedIDValues;

      //AllDomainsFinalSavedValue = AllDomainstingValues.join(", ");
      //AllDomainsFinalSavedIDValue=AllDomainIDvalues.join(",");

    this.setState({SubDomainSelectedArray:ItemInfo.SubDomainIDS.split(',').map(Number)});

     //numberArray1 = this.state.DomainSelectArray.map(Number);


  this.setState({AttachmentFiles:ItemInfo.AttachmentFiles})

     let strdoj= ItemInfo.LastReview.split('T');
     strdoj[0].replace("-","/");
    let mainstr=strdoj[0].replace("-","/");
    let strToDate = new Date(mainstr);
    this.setState({dtLastReview:strToDate})
     
     }

     else
     {

     this.GetAllConeteTypes();
     this.GetAllDomains();
     this.GetAllServiceGroups();
     this.GetAllRegions();


      
     }


     }




    private changeYourname(data: any): void {

      this.setState({ Name: data.target.value });

    }


     public async GetAllConeteTypes() {


      var data = await this._service.GetAllContentTypes();
  
      console.log(data);
  
      var AContentTypes: any = [];
  
      for (var k in data) {
  
        AContentTypes.push({ key: data[k].ID, text: data[k].Title});
      }
  
      console.log(AContentTypes);
  
      
     this.setState({ ContentTypeItems: AContentTypes });
    
  
    }

    
     private hadleContentType(event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void {

    
      this.setState({ MyContentTypeValue:item.key });

      ContentType=item.text;

      this.setState({contentypeKey:item.key});

      console.log(ContentType);
  
      
    }


   public async GetAllDomains() {

   
      var data = await this._service.GetAllDomains();
  
      console.log(data);
  
      var AllDomains: any = [];
  
      for (var k in data) {
  
        AllDomains.push({ key: data[k].ID, text: data[k].Title});
      }
  
      console.log(AllDomains);
  
      
     this.setState({ DomainItems: AllDomains });
    
  
    }

   
    private async handleDomains(event: React.FormEvent<HTMLDivElement>, item: IComboBoxOption)
    {


      if(item.selected==true)
      {

        AllDomainsSelected.push({key:item.key,text:item.text});

      let ItemInfo = await this._service.getSubdomainsbyID(item.key);
      //mofy

      
      AllDomainSavedValues.push(item.text);
      AllDomainsSavedIDValues.push(item.key);

      var myAraay1:any=[];

      myAraay1=this.state.DomainSelectArray;
      myAraay1.push(item.key);

      //this.setState({DomainSelectArray:myAraay1});

     this.setState(prevState => ({
  DomainSelectArray: [...prevState.DomainSelectArray]
}));

    //NEw

    var myAraay2:any=[];

      myAraay2=this.state.DomainSelectedTextArray;
      myAraay2.push(item.text);

      this.setState({DomainSelectedTextArray:myAraay2});



    //END

//integerArray.map(num => num.toString());

      const AllDomainstingValues: string[]=myAraay2;

      const AllDomainIDvalues:string[]=myAraay1.map((item:any) => item.toString());

      AllDomainsFinalSavedValue = AllDomainstingValues.join(", ");
      AllDomainsFinalSavedIDValue=AllDomainIDvalues.join(",");


      console.log(AllDomainsFinalSavedValue);
      console.log(AllDomainsFinalSavedIDValue);

      this.handleDomainsTest(this.state.DomainSelectArray);
  
      // for (var k in ItemInfo) {
  
      //   AllSubDomains.push({ key: ItemInfo[k].ID, text: ItemInfo[k].Title});
      // }

      console.log(ItemInfo);

      }
      else
      {


        let ItemInfo1 = await this._service.getSubdomainsbyID(item.key);
      

      for (var k in ItemInfo1) {

        const newArray = AllSubDomains.filter((item:any) =>{return item.key !== ItemInfo1[k].ID});

  
        AllSubDomains=newArray;
      }


      }

     this.setState({ SubDomainItems: AllSubDomains });
 

    }

     private async handleDomainsTest(myItems:[])
    {


      if(myItems.length>0)
      {



        var MyArra12:any=[];
        
//         var MyAllDomainNames:any[]=this.state.DomainItems;

         for(var count=0;count<myItems.length;count++)
         {

//   const newArray13 = MyAllDomainNames.filter((item:any) =>{return item.key === myItems[count]});



//   for (var k in newArray13) {

//  AllDomainSavedValues.push(newArray13[k].Title);
// AllDomainsSavedIDValues.push(newArray13[k].Id);
// }

//       const AllDomainstingValues: string[]=AllDomainSavedValues;
//       const AllDomainIDvalues:string[]=AllDomainsSavedIDValues;
 
//       AllDomainsFinalSavedValue = AllDomainstingValues.join(", ");
//       AllDomainsFinalSavedIDValue=AllDomainIDvalues.join(",");

let ItemInfo12 = await this._service.getSubdomainsbyID(myItems[count]);

for (var k in ItemInfo12) {
MyArra12.push({key: ItemInfo12[k].Id, text: ItemInfo12[k].Title});
}
}

this.setState({ SubDomainItems: MyArra12 });
   

      }
  

     
 

    }


    private async handleDomainsandSubDomains(event: React.FormEvent<HTMLDivElement>, item: IComboBoxOption): Promise<any>  {

      //alert(item.key);
    
       if(item.selected==true)
      {

      AllSubDomainsSelected.push({key: item.key, text: item.text});

      let ItemInfo = await this._service.getSubdomainsbyID(item.key);

      AllSubDomainSavedIDValues.push(item.key);
      AllSubDomainSavedTextValues.push(item.text)

      const AllFinalSubDomainsIDValues: string[]=AllSubDomainSavedIDValues;
      AllSubDomainsFinalIDValue = AllFinalSubDomainsIDValues.join(", ");

      const AllFinalSubDomainsTextValues: string[]=AllSubDomainSavedTextValues;
      AllSubDomainsFinalTextValues = AllFinalSubDomainsTextValues.join(", ");

      console.log(AllSubDomainsFinalTextValues);

      console.log(AllSubDomainsFinalIDValue);

//Belom Not required
      for (var k in ItemInfo) {
  
        AllSubDomains.push({ key: ItemInfo[k].ID, text: ItemInfo[k].Title});

      }

      console.log(ItemInfo);

      }
      else
      {


        let ItemInfo1 = await this._service.getSubdomainsbyID(item.key);
      

      for (var k in ItemInfo1) {

        const newArray = AllSubDomains.filter((item:any) =>{return item.key !== ItemInfo1[k].ID});

  
        AllSubDomains=newArray;
      }


      }

     this.setState({ SubDomainItems: AllSubDomains });
 
      
    }


     public async GetAllServiceGroups() {

   
      var data = await this._service.GetAllServiceGroups();
  
      console.log(data);
  
      
  
      for (var k in data) {
  
        AllServiceGroups.push({ key: data[k].ID, text: data[k].Title});
      }
  
      console.log(AllServiceGroups);
  
      
     this.setState({ ServiceGroupItems: AllServiceGroups });
    
  
    }


     private async handleServiceGroups(event: React.FormEvent<HTMLDivElement>, item: IComboBoxOption): Promise<any>  {

      //alert(item.key);
    
       if(item.selected==true)
      {

      let ItemInfo = await this._service.getServicesID(item.key);

      AllServiceGroupsSelected.push({key:item.key,text:item.text});


      AllServiceGroupsSavedValues.push(item.text);
      AllServiceGroupsSavedIDValues.push(item.key);

      const AllServiceGroupsstingValues: string[]=AllServiceGroupsSavedValues;
      const AllServiceGroupsIDvalues:string[]=AllServiceGroupsSavedIDValues;

      AllServiceGroupsFinalSavedValue = AllServiceGroupsstingValues.join(", ");
      console.log(AllServiceGroupsFinalSavedValue);
      AllServiceGroupsFinalSavedIDValue=AllServiceGroupsIDvalues.join(",");





      for (var k in ItemInfo) {
  
        AllServices.push({ key: ItemInfo[k].ID, text: ItemInfo[k].Title});
      }

      console.log(ItemInfo);

      }
      else
      {


        let ItemInfo1 = await this._service.getServicesID(item.key);
      

      for (var k in ItemInfo1) {

        const newArray = AllServices.filter((item:any) =>{return item.key !== ItemInfo1[k].ID});

  
        AllServices=newArray;
      }


      }

     this.setState({ ServicesItems: AllServices });
 
      
    }

   
    private async handleServiceGroupsandServices(event: React.FormEvent<HTMLDivElement>, item: IComboBoxOption): Promise<any>  {

      //alert(item.key);
    
       if(item.selected==true)
      {

      let ItemInfo = await this._service.getServicesID(item.key);

      AllServicesSelected.push({key: item.key, text: item.text});

      AllServicesSavedIDValues.push(item.key);
      AllServicesSavedTextValues.push(item.text);

      const AllFinalServicesIDValues: string[]=AllServicesSavedIDValues;
       AllServiceFinalSavedIDValue= AllFinalServicesIDValues.join(", ");

     const AllFinalServicestextValues:string[]=AllServicesSavedTextValues;
     AllServiceFinalSavedValue=AllFinalServicestextValues.join(",");

      console.log(AllServiceFinalSavedValue);



      for (var k in ItemInfo) {
  
        AllServices.push({ key: ItemInfo[k].ID, text: ItemInfo[k].Title});
      }

      console.log(ItemInfo);

      }
      else
      {


        let ItemInfo1 = await this._service.getServicesID(item.key);
      

      for (var k in ItemInfo1) {

        const newArray = AllServices.filter((item:any) =>{return item.key !== ItemInfo1[k].ID});

  
        AllServices=newArray;
      }


      }

     this.setState({ ServicesItems: AllServices });
 
      
    }


      public async GetAllRegions() {

   
      var data = await this._service.GetAllRegions();
  
      console.log(data);
  
      var AllRegions: any = [];
  
      for (var k in data) {
  
        AllRegions.push({ key: data[k].ID, text: data[k].Title});
      }
  
      console.log(AllRegions);
  
      
     this.setState({ RegionItems: AllRegions });
    
  
    }

 private async handleRegions(event: React.FormEvent<HTMLDivElement>, item: IComboBoxOption): Promise<any>  {

      //alert(item.key);
    
       if(item.selected==true)
      {

      AllRegionsSelected.push({key:item.key,text:item.text});

      let ItemInfo = await this._service.getCountryID(item.key);

      
      AllRegionSavedValues.push(item.text);
      AllRegionsSavedIDValues.push(item.key);

      const AllRegionstingValues: string[]=AllRegionSavedValues;
      const AllRegionIDvalues:string[]=AllRegionsSavedIDValues;

      AllRegionsFinalSavedValue = AllRegionstingValues.join(", ");
      AllRegionsFinalSavedIDValue=AllRegionIDvalues.join(",");


      console.log(AllRegionsFinalSavedValue);
      console.log(AllRegionsFinalSavedIDValue);


      for (var k in ItemInfo) {
  
        AllCountries.push({ key: ItemInfo[k].ID, text: ItemInfo[k].Title});
      }

      console.log(ItemInfo);

      }
      else
      {


        let ItemInfo1 = await this._service.getCountryID(item.key);
      

      for (var k in ItemInfo1) {

        const newArray = AllCountries.filter((item:any) =>{return item.key !== ItemInfo1[k].ID});

  
        AllCountries=newArray;
      }


      }

     this.setState({ CountryItems: AllCountries });
 
      
    }
    

    private async handleRegionCountries(event: React.FormEvent<HTMLDivElement>, item: IComboBoxOption): Promise<any>  {

      //alert(item.key);
    
       if(item.selected==true)
      {

      AllCountriesSelected.push({ key: item.key, text: item.text});

      let ItemInfo = await this._service.getCountryID(item.key);

      
      AllCountrySavedValues.push(item.text);
      AllCountrySavedIDValues.push(item.key);

      const AllCountrystingValues: string[]=AllCountrySavedValues;
      const AllCountryIDvalues:string[]=AllCountrySavedIDValues;

      AllCountryFinalSavedValue = AllCountrystingValues.join(", ");
      AllCountryFinalSavedIDValue=AllCountryIDvalues.join(",");


      console.log(AllCountryFinalSavedValue);
      console.log(AllCountryFinalSavedIDValue);


      for (var k in ItemInfo) {
  
        AllCountries.push({ key: ItemInfo[k].ID, text: ItemInfo[k].Title});
      }

      console.log(ItemInfo);

      }
      else
      {


        let ItemInfo1 = await this._service.getCountryID(item.key);
      

      for (var k in ItemInfo1) {

        const newArray = AllCountries.filter((item:any) =>{return item.key !== ItemInfo1[k].ID});

  
        AllCountries=newArray;
      }


      }

     this.setState({ CountryItems: AllCountries });
 
      
    }


    private changeClientName(data: any): void {

      this.setState({ Clientname: data.target.value });

    }


    private async _getPeoplePickerItems(items: any[]) {
  console.log('Items:', items);

  if(items.length>0)
  {

    Contact = items[0].text;

    let userInfo = this._service.getUserByLogin(items[0].loginName).then((info:any)=>{
    this.setState({ContactId:info});
    //ContatcNamekey=this.state.ContactId.Id;
    console.log(userInfo)
    console.log(Contact)
    
});

  }

  else
  {

    this.setState({ContactId:null});
  }



}


  public ChangeWiproSynergy(ev: React.FormEvent<HTMLInputElement>, option: any): void {  

    this.setState({  

      WiproSynergyKey: option.key  

            
      });  


      this.setState({  

        WiproSynergy: option.text  

      
  
        });  

      }

  private _onSelectDate = (date: Date | null | undefined): void => {
    this.setState({ dtLastReview: date });
   
   
};

  private _onFormatDate = (date: Date): string => {
      return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

     
  };

   private changedesc(data: any): void {

        this.setState({ desc: data.target.value });
  
      }

       private changeKeywords(data: any): void {

        this.setState({ keywords: data.target.value });
  
      }


          private changeFileuploadRecived(data: any) {

        let LocalFileVal= this.state.FileValuerecived;
        
         LocalFileVal.push(data.target.files[0]);
        
        
        this.setState({FileValuerecived:LocalFileVal});
        
        if(this.state.FileValuerecived.length==1)
        {
        this.setState({disableFileUploadrecived:true});
        
        }
        
        
        }
     
    private _removeItemFromDetailrecived(Item: any) {
      console.log("itemId: " + Item.name); 
    
     let localFileValues=[];
    
     localFileValues=this.state.FileValuerecived;
    
     if(localFileValues.length==1)
     {
    
      localFileValues=[];
     }
    
    
      for(var count=0;count<localFileValues.length;count++)
      {
    
        if(localFileValues[count].name==Item.name)
          {
            let Index=count;
    
            localFileValues.splice(Index,count);
    
          }
    
      }
    
      this.setState({FileValuerecived:localFileValues,disableFileUploadrecived:false});
    
    
    }


     public  getParam( name:any )
  {
   name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
   var regexS = "[\\?&]"+name+"=([^&#]*)";
   var regex = new RegExp( regexS );
   var results = regex.exec(window.location.href);
   if( results == null )
   return "";
   else
   return results[1];
  }
  

    private OnBtnClick():void{

      if(this.state.Name=='')
      {

        alert('Please enter your name')
      }

     else if(this.state.MyContentTypeValue=='')
      {

        alert('Please select ContentType value')
      }

      else if(AllDomainsSelected.length==0)
      {
       
        alert('Please select Domain Items')

      }

        else if(AllSubDomainsSelected.length==0)
      {
       
        alert('Please select Sub Domain Items')

      }

      else if(AllServiceGroupsSelected.length==0)
      {
       
        alert('Please select Service Group Items')

      }

       else if(AllServicesSelected.length==0)
      {
       
        alert('Please select Service Items')

      }

       else if(AllRegionsSelected.length==0)
      {
       
        alert('Please select Region Items')

      }



      else if(AllCountriesSelected.length==0)
      {
       
        alert('Please select Country Items')

      }

      else if(this.state.Clientname=='')
      {

        alert('Please enter your Client Name')
      }

      else if(this.state.WiproSynergyKey=='')
      {

        alert('Please select Wipro Synergy')
      }

      else if(this.state.dtLastReview=='')
        {
  
          alert('Please select Last Review Date')
        }

         else if(this.state.FileValuerecived.length==0)
        {
         
          alert('please select any file');
        }

        else

          {


        let date1=(this.state.dtLastReview.getDate()+1);

        console.log(date1);

        let month1= (this.state.dtLastReview.getMonth()+1);

        let year1 =(this.state.dtLastReview.getFullYear());

        let FinalLastReviewDate1=month1+'/'+this.state.dtLastReview.getDate() +'/' +year1;
        console.log(FinalLastReviewDate1);
       console.log(AllServiceFinalSavedIDValue);
       console.log(AllServiceGroupsFinalSavedIDValue);


          let myfiles=[];

          for(var count=0;count<this.state.FileValuerecived.length;count++)
          {
            
            myfiles.push(this.state.FileValuerecived[count]);
          }


          if(this.state.Name!="")
          {

          for (var count=0;count<AllCountriesSelected.length;count++)
          {

           

              this._service.Save(

          this.state.Name,
          ContentType,
          AllDomainsFinalSavedValue,
          AllDomainsFinalSavedIDValue,
          AllSubDomainsFinalTextValues,
          AllSubDomainsFinalIDValue,

          AllServiceGroupsFinalSavedValue,
          AllServiceGroupsFinalSavedIDValue,
          AllServiceFinalSavedValue,
          AllServiceFinalSavedIDValue,

          AllRegionsFinalSavedValue,
          AllRegionsFinalSavedIDValue,

          AllCountries[count].key,
          AllCountries[count].text,
          // AllCountryFinalSavedValue,
          // AllCountryFinalSavedIDValue,
          this.state.Clientname,
          (this.state.ContactId == null ? 0:this.state.ContactId.Id),
          this.state.WiproSynergy,
          FinalLastReviewDate1,
          this.state.desc,
          this.state.keywords,
          this.state.MyContentTypeValue,

          myfiles).then(function (data:any)
          {
      
            console.log(data);

          
          
          });


          }

          alert('Record submitted successfully');
     
          }

        }


    }
     


  public render(): React.ReactElement<IMarketHubProps> {
    
    return (

      

      <Stack tokens={stackTokens} styles={stackStyles} >
      {myitemId=="" &&
      <Stack>

      <div className={styles.Divsection}> 
<b><label className={styles.labelsFonts}>Attachment <label className={styles.recolorss}>*</label></label></b><br/><br/>

<input id="infringementFiles" type="file"  name="files[]"  onChange={this.changeFileuploadRecived.bind(this)} disabled={this.state.disableFileUploadrecived}/>

{this.state.FileValuerecived.map((item:any,index:any) =>(

 <div className={styles.padcss}>  
 
 {item.name} <Icon iconName='Delete'  onClick={(event:any) => {this._removeItemFromDetailrecived(item)}}/>

 </div>
 
  

))}

</div>

<br></br>

      {/* <b><label className={styles.HeadLable}>Marketing Hub</label></b><br/>   */}
      <b><label className={styles.labelsFonts}>Title of Document <label className={styles.recolorss}>*</label></label></b><br/>  
      <input type="text" name="txtyourName" value={this.state.Name} onChange={this.changeYourname.bind(this)} className={styles.links}/><br></br>

      <b><label className={styles.labelsFonts}>Content Types <label className={styles.recolorss} >*</label></label></b><br></br> 
    <Dropdown className={styles.onlyFont}
  placeholder="Select  ContentTypes"
  options={this.state.ContentTypeItems}
  styles={dropdownStyles}
  selectedKey={this.state.MyContentTypeValue ? this.state.MyContentTypeValue : undefined} onChange={this.hadleContentType.bind(this)}/>
  <br></br>

  <b><label className={styles.labelsFonts}>Domains <label className={styles.recolorss} >*</label></label></b><br></br> 
   <ComboBox  styles={comboBoxStyles}
         placeholder="Select  Domains"
         options={this.state.DomainItems}
         onChange={this.handleDomains.bind(this)}
         
         //onSelect={this.handleDomains.bind(this)}
         
          multiSelect={true}>
            </ComboBox>
 <br></br>

 <b><label className={styles.labelsFonts}>Sub Domains <label className={styles.recolorss} >*</label></label></b><br></br> 
    <ComboBox  styles={comboBoxStyles}
         placeholder="Select  SubDomains"
         options={this.state.SubDomainItems}
         onChange={this.handleDomainsandSubDomains.bind(this)}
         
         multiSelect={true}>
    </ComboBox>

<br></br>
    
  <b><label className={styles.labelsFonts}>Service Groups <label className={styles.recolorss} >*</label></label></b><br></br> 
   <ComboBox  styles={comboBoxStyles}
         placeholder="Select  Serivce Groups"
         options={this.state.ServiceGroupItems}
         onChange={this.handleServiceGroups.bind(this)}
          multiSelect={true}>
            </ComboBox>
 <br></br>

 <b><label className={styles.labelsFonts}>Services <label className={styles.recolorss} >*</label></label></b><br></br> 
    <ComboBox  styles={comboBoxStyles}
         placeholder="Select  Services"
         options={this.state.ServicesItems}
         onChange={this.handleServiceGroupsandServices.bind(this)}
         multiSelect={true}>
    </ComboBox>
    <br></br>



    <b><label className={styles.labelsFonts}>Regions <label className={styles.recolorss} >*</label></label></b><br></br> 
   <ComboBox  styles={comboBoxStyles}
         placeholder="Select  Regions"
         options={this.state.RegionItems}
         onChange={this.handleRegions.bind(this)}
          multiSelect={true}>
            </ComboBox>
 <br></br>

 <b><label className={styles.labelsFonts}>Countries <label className={styles.recolorss} >*</label></label></b><br></br> 
    <ComboBox  styles={comboBoxStyles}
         placeholder="Select  Countries"
         options={this.state.CountryItems}
         onChange={this.handleRegionCountries.bind(this)}
         multiSelect={true}>
    </ComboBox>
    <br></br>

<b><label className={styles.labelsFonts}>Client <label className={styles.recolorss}>*</label></label></b><br/>  
<input type="text" name="txtClient" value={this.state.Clientname} onChange={this.changeClientName.bind(this)} className={styles.links}/><br></br>

<b><label className={styles.labelsFonts}>Contact <label className={styles.recolorss}>*</label></label></b><br/>  
<div className={styles.Pepsize}>  
              <PeoplePicker 
                  context={this.props.context}
                  //titleText="User Name"
                  personSelectionLimit={1}
                  showtooltip={true}
                  required={true}
                  disabled={false}
                  onChange={this._getPeoplePickerItems.bind(this)}
                 
                  showHiddenInUI={false}
                  principalTypes={[PrincipalType.User]}
                  webAbsoluteUrl='https://capcoinc.sharepoint.com/sites/MarketHubSandbox/'
                  defaultSelectedUsers={(this.state.ContactId && this.state.ContactId.length) ? [this.state.ContactId] : []}
                  ref={c => (this.ppl = c)} 
                  resolveDelay={1000} />  
</div>
<br></br><br></br>

<b><label className={styles.labelsFonts}>Wipro Synergy </label><label className={styles.recolorss}>*</label></b><br/>  
<b><ChoiceGroup className={styles.labelsFonts}  id="rdbWiproSynergy"  name="Wipro Synergy" options={WiproSynergyOptions}   onChange={this.ChangeWiproSynergy.bind(this)}  selectedKey={this.state.WiproSynergyKey}/></b><br></br>

<div className={styles.Divsection}> 
<b><label className={styles.labelsFonts}>Date of Last Review <label className={styles.recolorss}>*</label></label></b><br/><br/> 
<div className={styles.DateClass}>
<DatePicker id="dtLastReviewid" placeholder="Select a date..."
                            onSelectDate={this._onSelectDate}
                            value={this.state.dtLastReview}
                            formatDate={this._onFormatDate}
                            isMonthPickerVisible={false}
                            className={styles.links}
                            />
           </div></div>
        <br></br>

<div className={styles.Divsection}> 

<b><label className={styles.labelsFonts}>Description </label></b><br/><br/> 
<div className={styles.welcome}>
<TextField
      multiline
      rows={3}
       value={this.state.desc}
      onChange={this.changedesc.bind(this)}
    />
    </div></div>
<br></br>
<div className={styles.Divsection}> 
<b><label className={styles.labelsFonts}>Keywords </label></b><br/><br/>
<div className={styles.welcome}>
<TextField
      multiline
      rows={3}
       value={this.state.keywords}
      onChange={this.changeKeywords.bind(this)}
    />
    </div></div>
<br></br>


<PrimaryButton text="Submit" onClick={this.OnBtnClick.bind(this)} styles={stackButtonStyles} className={styles.welcomeImage} /><br></br>


      </Stack>

       }

       {myitemId!="" &&
       <Stack>


<div className={styles.Divsection}> 
<b><label className={styles.labelsFonts}>Attachment<label className={styles.recolorss}>*</label></label></b><br/><br/>

<input id="infringementFiles" type="file"  name="files[]"  onChange={this.changeFileuploadRecived.bind(this)}/>

{this.state.AttachmentFiles.length>0 && this.state.AttachmentFiles.map((item:any,index:any) =>( 
    <div><a href={item.ServerRelativeUrl} target="_blank">{item.FileName} </a></div>
   ))}

</div>


<b><label className={styles.labelsFonts}> Title of Document <label className={styles.recolorss}>*</label></label></b><br></br>
<input type="text" name="txtName" value={this.state.Name} onChange={this.changeYourname.bind(this)} className={styles.boxsize}/><br></br>
<b><label className={styles.labelsFonts}>Content Types <label className={styles.recolorss} >*</label></label></b><br></br> 
  <Dropdown className={styles.onlyFont}
  placeholder="Select  ContentTypes"
  options={this.state.ContentTypeItems}
  styles={dropdownStyles}
  selectedKey={this.state.MyContentTypeValue ? this.state.MyContentTypeValue : undefined} onChange={this.hadleContentType.bind(this)}/>
  <br></br>

<b><label className={styles.labelsFonts}>Domains12 <label className={styles.recolorss} >*</label></label></b><br></br> 
   <ComboBox  styles={comboBoxStyles}
         placeholder="Select  Domains"
         options={this.state.DomainItems}
         onChange={this.handleDomains.bind(this)}
         selectedKey={this.state.DomainSelectArray}
         defaultSelectedKey={this.state.DomainSelectArray}
         //selectedKey={numberArray1}
          multiSelect={true}>
            </ComboBox>
 <br></br>

  
  <b><label className={styles.labelsFonts}>Sub Domains 12 <label className={styles.recolorss} >*</label></label></b><br></br> 
   <ComboBox  styles={comboBoxStyles}
         placeholder="Select  Sub Domains"
         options={this.state.SubDomainItems}
         onChange={this.handleDomainsandSubDomains.bind(this)}
         selectedKey={this.state.SubDomainSelectedArray}
         //selectedKey={numberArray1}
          multiSelect={true}>
            </ComboBox>
 <br></br>
   
   <b><label className={styles.labelsFonts}>Service Groups <label className={styles.recolorss} >*</label></label></b><br></br> 

   <b><label className={styles.labelsFonts}>Services <label className={styles.recolorss} >*</label></label></b><br></br> 

   <b><label className={styles.labelsFonts}>Regions <label className={styles.recolorss} >*</label></label></b><br></br> 

   <b><label className={styles.labelsFonts}>Countries <label className={styles.recolorss} >*</label></label></b><br></br> 

   
<b><label className={styles.labelsFonts}>Client <label className={styles.recolorss}>*</label></label></b><br/>  
<input type="text" name="txtClient" value={this.state.Clientname} onChange={this.changeClientName.bind(this)} className={styles.links}/><br></br>

<b><label className={styles.labelsFonts}>Contact <label className={styles.recolorss}>*</label></label></b><br/>  
<div className={styles.Pepsize}>  
              <PeoplePicker 
                  context={this.props.context}
                  //titleText="User Name"
                  personSelectionLimit={1}
                  showtooltip={true}
                  required={true}
                  disabled={false}
                  onChange={this._getPeoplePickerItems.bind(this)}
                   showHiddenInUI={false}
                  principalTypes={[PrincipalType.User]}
                  webAbsoluteUrl='https://capcoinc.sharepoint.com/sites/MarketHubSandbox/'
                  defaultSelectedUsers={(this.state.ContactId && this.state.ContactId.length) ? [this.state.ContactId] : []}
                  ref={c => (this.ppl = c)} 
                  resolveDelay={1000} />  
</div>
<br></br><br></br>

<b><label className={styles.labelsFonts}>Wipro Synergy </label><label className={styles.recolorss}>*</label></b><br/>  
<b><ChoiceGroup className={styles.labelsFonts}  id="rdbWiproSynergy"  name="Wipro Synergy" options={WiproSynergyOptions}   onChange={this.ChangeWiproSynergy.bind(this)}  selectedKey={this.state.WiproSynergyKey}/></b><br></br>

<div className={styles.Divsection}> 
<b><label className={styles.labelsFonts}>Date of Last Review <label className={styles.recolorss}>*</label></label></b><br/><br/> 
<div className={styles.DateClass}>
<DatePicker id="dtLastReviewid" placeholder="Select a date..."
                            onSelectDate={this._onSelectDate}
                            value={this.state.dtLastReview}
                            formatDate={this._onFormatDate}
                            isMonthPickerVisible={false}
                            className={styles.links}
                            />
           </div></div>
        <br></br>

<div className={styles.Divsection}> 
<b><label className={styles.labelsFonts}>Description </label></b><br/><br/> 
<div className={styles.welcome}>
<TextField
      multiline
      rows={3}
       value={this.state.desc}
      onChange={this.changedesc.bind(this)}
    />
    </div></div>
<br></br>
<div className={styles.Divsection}> 
<b><label className={styles.labelsFonts}>Keywords </label></b><br/><br/>
<div className={styles.welcome}>
<TextField
      multiline
      rows={3}
       value={this.state.keywords}
      onChange={this.changeKeywords.bind(this)}
    />
    </div></div>
<br></br>

        </Stack>


       }
      </Stack>
     
    );
  }
}
