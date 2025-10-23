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


const stackTokens1 = { childrenGap: 30 };

const comboBoxStyles: Partial<IComboBoxStyles> = { root: { maxWidth: 300 } };

const WiproSynergyOptions: IChoiceGroupOption[] = 

[ { key: "Yes", text: "Yes" },
  { key: "No", text: "No" }];  


  let updatedDomainTextsString='';

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

var AllSubDomainSavedIDValues:any=[];
var AllSubDomainSavedTextValues:any=[];

var AllDomainsSelected:any=[];

var AllSubDomains: any = [];
let AllSubDomainsFinalIDValue='';

let AllSubDomainsFinalTextValues='';

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
SubDomainSelectedTextArray:any;

ServiceGroupsSelectedArray:any;
ServiceGroupsSelectedTextArray:any;

ServicesSelectedArray:any;
ServicesSelectedTextArray:any;


RegionSelectArray:any;
RegionSelectedTextArray:any;

CountriesSelectedArray:any;
CountriesSelectedTextArray:any;

CountryName:any;
MyRegionName:any;
UpdateDomainIdString:any;
UpdateSubDomainIdString:any;
UpdateCountryIdString:any;
UpdatedServicesIdString:any;
SubDomainsFinalStringValue:any;
CountryFinalStringValue:any;
ServicesFinalStringValue:any;
isSaving:boolean;

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
     SubDomainSelectedArray:[],
     SubDomainSelectedTextArray:[],

     ServiceGroupsSelectedArray:[],
     ServiceGroupsSelectedTextArray:[],

     ServicesSelectedArray:[],
    ServicesSelectedTextArray:[],

    RegionSelectArray:[],
    RegionSelectedTextArray:[],

    CountriesSelectedArray:[],
CountriesSelectedTextArray:[],

CountryName:"",
MyRegionName:"",
UpdateDomainIdString:"",
UpdateSubDomainIdString:"",
UpdateCountryIdString:"",
UpdatedServicesIdString:"",
SubDomainsFinalStringValue:"",
CountryFinalStringValue:"",
ServicesFinalStringValue:"",
isSaving:false




    };

     this._service = new Service(this.props.url, this.props.context);
    
     this.GlobalService1 = new Service(this.props.url, this.props.context);

     myitemId = this.getParam('SID');

     this.GetAllConeteTypes();
     this.GetAllDomains();
     this.GetAllServiceGroups();
     this.GetAllRegions();

      

     if(myitemId!="")
     {

      this.GeRecrords();

     }

     
  }


   public async GeRecrords()
     {

    myitemId = this.getParam('SID');

    console.log(AllSubDomainsFinalIDValue);
    console.log(AllCountryFinalSavedValue);
    console.log(AllCountryFinalSavedIDValue);
    console.log(AllSubDomainsFinalTextValues);
    
let ItemInfo1 = await this._service.getItemByID(myitemId);

if(ItemInfo1.Status=="Pending")
{


     if(myitemId!="")
     {

      this.GetAllConeteTypes();
      this.GetAllDomains();
      this.GetAllServiceGroups();
      

    let ItemInfo = await this._service.getItemByID(myitemId);

    this.setState({AttachmentFiles:ItemInfo.AttachmentFiles})
    this.setState({Name: ItemInfo.Name });
    this.setState({MyContentTypeValue:ItemInfo.ReqcontenttypeID});
    ContentType=ItemInfo.ContentTypes;
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
     
   

    this.setState({DomainSelectArray:ItemInfo.DomainIDS.split(',').map(Number)});
    this.setState({DomainSelectedTextArray:ItemInfo.Domains.split(',')});
    this.handleDomainsTest(this.state.DomainSelectArray);
      AllDomainsFinalSavedValue = ItemInfo.Domains;
      AllDomainsFinalSavedIDValue=ItemInfo.DomainIDS;



      this.setState({ServiceGroupsSelectedArray:ItemInfo.ServiceGroupIDS.split(',').map(Number)});
    this.setState({ServiceGroupsSelectedTextArray:ItemInfo.ServiceGroups.split(',')});
    this.handleServicesTest(this.state.ServiceGroupsSelectedArray);
    AllServiceGroupsFinalSavedValue=ItemInfo.ServiceGroups;
    AllServiceGroupsFinalSavedIDValue=ItemInfo.ServiceGroupIDS;

    this.setState({SubDomainSelectedArray:ItemInfo.SubDomainIDS.split(',').map(Number)});
    this.setState({SubDomainSelectedTextArray:ItemInfo.SubDomains.split(',')});
     AllSubDomainsFinalIDValue=ItemInfo.SubDomainIDS;
    AllSubDomainsFinalTextValues=ItemInfo.SubDomains;

   
      this.setState({ServicesSelectedArray:ItemInfo.ServicesIDS.split(',').map(Number)});
    this.setState({ServicesSelectedTextArray:ItemInfo.Services.split(',')});
     AllServiceFinalSavedValue=ItemInfo.Services;
    //AllServiceGroupsFinalSavedValue=ItemInfo.Services;
    AllServiceFinalSavedIDValue=ItemInfo.ServicesIDS;

    //Country & Region

    this.setState({CountryName:ItemInfo.Countries});
    
   //let ItemInfo1 = await this._service.getRegionbyTitle(this.state.CountryName);
   //let ItemInfo2 = await this._service.getRegionName(ItemInfo1.RegionId);

   this.setState({MyRegionName:ItemInfo.Regions});

   console.log(ItemInfo1);


  this.setState({AttachmentFiles:ItemInfo.AttachmentFiles})

     let strdoj= ItemInfo.LastReview.split('T');
     strdoj[0].replace("-","/");
    let mainstr=strdoj[0].replace("-","/");
    let strToDate = new Date(mainstr);
    this.setState({dtLastReview:strToDate})


      this.setState({contentypeKey:ItemInfo.ReqcontenttypeID})
     
     }

     else
     {

     this.GetAllConeteTypes();
     this.GetAllDomains();
     this.GetAllServiceGroups();
     this.GetAllRegions();


      
     }


     }

     else
     {

      alert('Record is already Approved or Rejected')
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

      //AllDomainsFinalSavedValue = AllDomainstingValues.join(", ");
      AllDomainsFinalSavedValue = AllDomainstingValues.map(text => text.trim()).join(",");
      AllDomainsFinalSavedIDValue=AllDomainIDvalues.map(text => text.trim()).join(",");


      console.log(AllDomainsFinalSavedValue);
      console.log(AllDomainsFinalSavedIDValue);

      this.handleDomainsTest(this.state.DomainSelectArray);
  
       console.log(ItemInfo);

      this.setState({ SubDomainItems: AllSubDomains });

      

 

      }
      else
      {

    const subDomainsToRemove = await this._service.getSubdomainsbyID(item.key);
    const subDomainIdsToRemove = subDomainsToRemove.map((sd: any) => sd.ID);
    const updatedDomainIds = this.state.DomainSelectArray.filter((id: any) => id !== item.key);
    const updatedDomainIdsString: string = updatedDomainIds.join(",");
   const updatedDomainTexts = this.state.DomainSelectedTextArray.filter((text: any) => text !== item.text);
   const updatedDomainTextsString: string = updatedDomainTexts.join(",");

   const updatedSubDomainItems = this.state.SubDomainItems.filter((sd: any) => !subDomainIdsToRemove.includes(sd.key));
    const updatedSubDomainSelectedArray = this.state.SubDomainSelectedArray.filter((sdKey:any) => !subDomainIdsToRemove.includes(sdKey));
    const updatedSubDomainSelectedTextArray = this.state.SubDomainSelectedTextArray.filter((sdText:any) =>
      !subDomainsToRemove.some((sd: any) => sd.Title === sdText)
    );

    this.setState({
      DomainSelectArray: updatedDomainIds,
      DomainSelectedTextArray: updatedDomainTexts,
      SubDomainItems: updatedSubDomainItems,
      SubDomainSelectedArray: updatedSubDomainSelectedArray,
      SubDomainSelectedTextArray: updatedSubDomainSelectedTextArray
      
    });

        AllDomainsFinalSavedIDValue = updatedDomainIdsString;
        AllDomainsFinalSavedValue = updatedDomainTextsString;

    if (updatedSubDomainSelectedArray.length === 0) {
    AllSubDomainsFinalTextValues = "";
    AllSubDomainsFinalIDValue = "";
  } else {
    AllSubDomainsFinalTextValues = updatedSubDomainSelectedTextArray.join(",");
    AllSubDomainsFinalIDValue = updatedSubDomainSelectedArray.map((id: any) => id.toString()).join(",");
  }



      }

     
 

    }

     private async handleDomainsTest(myItems:[])
    {


      if(myItems.length>0)
      {



        var MyArra12:any=[];
        
//         var MyAllDomainNames:any[]=this.state.DomainItems;

         for(var count=0;count<myItems.length;count++)
         {


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

      //let ItemInfo1 = await this._service.getSubdomainsbyID(item.key);

      AllSubDomainSavedIDValues.push(item.key);
      AllSubDomainSavedTextValues.push(item.text);

      var MyArray2:any=[];

      MyArray2=this.state.SubDomainSelectedArray;
      MyArray2.push(item.key);

         this.setState(prevState => ({
  SubDomainSelectedArray: [...prevState.SubDomainSelectedArray]
  
}));

 var myAraay3:any=[];

      myAraay3=this.state.SubDomainSelectedTextArray;
      myAraay3.push(item.text);

      this.setState({SubDomainSelectedTextArray:myAraay3});

       const AllSubDomainstingValues: string[]=myAraay3;

      const AllSubDomainIDvalues:string[]=MyArray2.map((item:any) => item.toString());

      AllSubDomainsFinalTextValues = AllSubDomainstingValues.map(text => text.trim()).join(",")
      AllSubDomainsFinalIDValue=AllSubDomainIDvalues.map(text => text.trim()).join(",")



      }
      else
      {

    const updatedSelectedArray = this.state.SubDomainSelectedArray.filter(
      (key: any) => key !== item.key
    );
    const updatedSelectedTextArray = this.state.SubDomainSelectedTextArray.filter(
      (text: any) => text !== item.text
    );

    const updatedSubDomainSelectedArrayString: string = updatedSelectedArray.join(",");
    this.setState({UpdateSubDomainIdString:updatedSubDomainSelectedArrayString})


   const updatedSelectedTextArraySubDomainString: string = updatedSelectedTextArray.join(",");

this.setState({SubDomainsFinalStringValue:updatedSelectedTextArraySubDomainString});

    // Also remove from global arrays
    AllSubDomainsSelected = AllSubDomainsSelected.filter((sd: any) => sd.key !== item.key);
    AllSubDomainSavedIDValues = AllSubDomainSavedIDValues.filter((id: any) => id !== item.key);
    AllSubDomainSavedTextValues = AllSubDomainSavedTextValues.filter((txt: any) => txt !== item.text);

    // Update state immutably
    this.setState({
      SubDomainSelectedArray: updatedSelectedArray,
      SubDomainSelectedTextArray: updatedSelectedTextArray
    });

    // Update joined values again
    const AllSubDomainstingValues = updatedSelectedTextArray;
    const AllSubDomainIDvalues = updatedSelectedArray.map((item: any) => item.toString());

    AllSubDomainsFinalTextValues = AllSubDomainstingValues.map((text:any) => text.trim()).join(",")
    AllSubDomainsFinalIDValue = AllSubDomainIDvalues.map((text:any) => text.trim()).join(",")



      } 
    }
//Last

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

      //let ItemInfo = await this._service.getServicesID(item.key);

      AllServiceGroupsSelected.push({key:item.key,text:item.text});

      AllServiceGroupsSavedValues.push(item.text);
      AllServiceGroupsSavedIDValues.push(item.key);


       var myAraay1:any=[];

      myAraay1=this.state.ServiceGroupsSelectedArray;
      myAraay1.push(item.key);

         this.setState(prevState => ({
  ServiceGroupsSelectedArray: [...prevState.ServiceGroupsSelectedArray]
}));

    var myAraay2:any=[];

      myAraay2=this.state.ServiceGroupsSelectedTextArray;
      myAraay2.push(item.text);

      this.setState({ServiceGroupsSelectedTextArray:myAraay2});


      const AllServiceGroupsstingValues: string[]=myAraay2;
      const AllServiceGroupsIDvalues:string[]=myAraay1.map((item:any) => item.toString());;

      AllServiceGroupsFinalSavedValue = AllServiceGroupsstingValues.map(text => text.trim()).join(",");
      AllServiceGroupsFinalSavedIDValue=AllServiceGroupsIDvalues.map(text => text.trim()).join(",");

      console.log(AllServiceGroupsFinalSavedValue);
      console.log(AllServiceGroupsFinalSavedIDValue);

      this.handleServicesTest(this.state.ServiceGroupsSelectedArray);

      this.setState({ ServicesItems: AllServices });

      }
      else
      {

    const servicesToRemove  = await this._service.getServicesID(item.key);
    const servicesIdsToRemove = servicesToRemove .map((sd: any) => sd.ID);
    const updatedServiceGroupsIds = this.state.ServiceGroupsSelectedArray.filter((id: any) => id !== item.key);
    //const updatedServiceGroupIdsString: string = updatedServiceGroupsIds.join(",");
   const updatedServiceGroupTexts = this.state.ServiceGroupsSelectedTextArray.filter((text: any) => text !== item.text);
   //const updatedServiceGroupsString: string = updatedServiceGroupTexts.join(",");

    
    const updatedServicegroupItems = this.state.ServicesItems.filter((sd: any) => !servicesIdsToRemove.includes(sd.key));
    const updatedServiceGroupSelectedArray = this.state.ServicesSelectedArray.filter((sdKey:any) => !servicesIdsToRemove.includes(sdKey));
    const updatedServicesSelectedTextArray = this.state.ServicesSelectedTextArray.filter((sdText:any) =>
      !servicesToRemove .some((sd: any) => sd.Title === sdText)
    );

    this.setState({
      ServiceGroupsSelectedArray: updatedServiceGroupsIds,
      ServiceGroupsSelectedTextArray: updatedServiceGroupTexts,
      ServicesItems: updatedServicegroupItems,
      ServicesSelectedArray: updatedServiceGroupSelectedArray,
      ServicesSelectedTextArray: updatedServicesSelectedTextArray
      //SubDomainSelectedArray: [], // clear subdomain selection
    });

    //AllDomainsFinalSavedIDValue=updatedDomainIdsString.map(text => text.trim()).join(",");

        AllServiceGroupsFinalSavedIDValue = updatedServiceGroupsIds.join(",");
        AllServiceGroupsFinalSavedValue = updatedServiceGroupTexts.join(",");

        //Added


         if (updatedServiceGroupSelectedArray.length === 0) {
    // All service groups removed → clear services entirely
    AllServiceFinalSavedValue = "";
    AllServiceFinalSavedIDValue = "";
  } else {
    const clearedServiceIDs = updatedServiceGroupSelectedArray.map((id: any) => id.toString());
    const clearedServiceTexts = updatedServicesSelectedTextArray.map((txt: any) => txt.trim());
    AllServiceFinalSavedValue = clearedServiceTexts.join(",");
    AllServiceFinalSavedIDValue = clearedServiceIDs.join(",");

    //New

    const serviceIdsArray = AllServiceFinalSavedIDValue
  ? AllServiceFinalSavedIDValue.split(",").map(id => id.trim())
  : [];

let allServiceNames: string[] = [];

for (const id of serviceIdsArray) {
  console.log("Processing Service ID:", id);

  const ItemInfo11 = await this._service.getItemByID1(id);

  if (ItemInfo11 && ItemInfo11.ServiceName) {
    allServiceNames.push(ItemInfo11.ServiceName.trim());
  }
}

AllServiceFinalSavedValue = allServiceNames.join(",");

//END



  }
        

      }

     
 
      
    }

      private async handleServicesTest(myItems:[])
    {


      if(myItems.length>0)
      {



        var MyArra12:any=[];
        
//         var MyAllDomainNames:any[]=this.state.DomainItems;

         for(var count=0;count<myItems.length;count++)
         {

let ItemInfo12 = await this._service.getServicesID(myItems[count]);

for (var k in ItemInfo12) {
MyArra12.push({key: ItemInfo12[k].Id, text: ItemInfo12[k].Title});
}
}

this.setState({ ServicesItems: MyArra12 });
   

      }
  

     
 

    }

   
    private async handleServiceGroupsandServices(event: React.FormEvent<HTMLDivElement>, item: IComboBoxOption): Promise<any>  {

      //alert(item.key);
    
       if(item.selected==true)
      {

      

      AllServicesSelected.push({key: item.key, text: item.text});

      AllServicesSavedIDValues.push(item.key);
      AllServicesSavedTextValues.push(item.text);

          var MyArray2:any=[];

      MyArray2=this.state.ServicesSelectedArray;
      MyArray2.push(item.key);

         this.setState(prevState => ({
  ServicesSelectedArray: [...prevState.ServicesSelectedArray]
  
}));


       var myAraay3:any=[];

      myAraay3=this.state.ServicesSelectedTextArray;
      myAraay3.push(item.text);

      this.setState({ServicesSelectedTextArray:myAraay3});



      const AllServicesstringValues: string[]=myAraay3;

      const  AllServicesServicesIDValue:string[]=MyArray2.map((item:any) => item.toString());

      AllServiceFinalSavedValue=AllServicesstringValues.map(text => text.trim()).join(",");
      AllServiceFinalSavedIDValue=AllServicesServicesIDValue.map(text => text.trim()).join(",");

      console.log(AllServiceFinalSavedValue);


      }
      else
      {

         const updatedSelectedArray = this.state.ServicesSelectedArray.filter(
      (key: any) => key !== item.key
    );
    const updatedSelectedTextArray = this.state.ServicesSelectedTextArray.filter(
      (text: any) => text !== item.text
    );

    const updatedServicesSelectedArrayString: string = updatedSelectedArray.join(",");
    this.setState({UpdatedServicesIdString:updatedServicesSelectedArrayString})


   const updatedSelectedTextArrayServiceString: string = updatedSelectedTextArray.join(",");

this.setState({ServicesFinalStringValue:updatedSelectedTextArrayServiceString});

    // Also remove from global arrays
    AllServicesSelected= AllServicesSelected.filter((sd: any) => sd.key !== item.key);
    AllServicesSavedIDValues = AllServicesSavedIDValues.filter((id: any) => id !== item.key);
    AllServicesSavedTextValues = AllServicesSavedTextValues.filter((txt: any) => txt !== item.text);

    // Update state immutably
    this.setState({
      ServicesSelectedArray: updatedSelectedArray,
      ServicesSelectedTextArray: updatedSelectedTextArray
    });

    // Update joined values again
    const AllServicesstingValues = updatedSelectedTextArray;
    const AllServicesIDvalues = updatedSelectedArray.map((item: any) => item.toString());

     AllServiceFinalSavedValue= AllServicesstingValues.map((text:any) => text.trim()).join(",")
     AllServiceFinalSavedIDValue= AllServicesIDvalues.map((text:any) => text.trim()).join(",")



     //New

         const serviceIdsArray = AllServiceFinalSavedIDValue
  ? AllServiceFinalSavedIDValue.split(",").map(id => id.trim())
  : [];

let allServiceNames: string[] = [];

for (const id of serviceIdsArray) {
  console.log("Processing Service ID:", id);

  const ItemInfo11 = await this._service.getItemByID1(id);

  if (ItemInfo11 && ItemInfo11.ServiceName) {
    allServiceNames.push(ItemInfo11.ServiceName.trim());
  }
}

AllServiceFinalSavedValue = allServiceNames.join(",");



       


      }


 
      
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

      
      var myAraay1:any=[];

      myAraay1=this.state.RegionSelectArray;
      myAraay1.push(item.key);

          this.setState(prevState => ({
  RegionSelectArray: [...prevState.RegionSelectArray]
}));

var myAraay2:any=[];

      myAraay2=this.state.RegionSelectedTextArray;
      myAraay2.push(item.text);

      this.setState({RegionSelectedTextArray:myAraay2});
//END

      const AllRegionstingValues: string[]=myAraay2;
      const AllRegionIDvalues:string[]=myAraay1.map((item:any) => item.toString());

      AllRegionsFinalSavedValue = AllRegionstingValues.map(text => text.trim()).join(",");
      AllRegionsFinalSavedIDValue=AllRegionIDvalues.map(text => text.trim()).join(",");


      console.log(AllRegionsFinalSavedValue);
      console.log(AllRegionsFinalSavedIDValue);

this.handleRegionsTest(this.state.RegionSelectArray);
   
      console.log(ItemInfo);

      this.setState({ CountryItems: AllCountries })

      }
      else
      {

        
  const subCountriesToRemove = await this._service.getCountryID(item.key);
  const subCountriesIdsToRemove = subCountriesToRemove.map((sd: any) => sd.ID);

  const updatedRegionsIds = this.state.RegionSelectArray.filter((id: any) => id !== item.key);
  const updatedRegionsTexts = this.state.RegionSelectedTextArray.filter((text: any) => text !== item.text);

  const updatedCountryItems = this.state.CountryItems.filter(
    (sd: any) => !subCountriesIdsToRemove.includes(sd.key)
  );
  const updatedCountrySelectedArray = this.state.CountriesSelectedArray.filter(
    (sdKey: any) => !subCountriesIdsToRemove.includes(sdKey)
  );
  const updatedCountrySelectedTextArray = this.state.CountriesSelectedTextArray.filter(
    (sdText: any) => !subCountriesIdsToRemove.some((sd: any) => sd.Title === sdText)
  );

  // ✅ Keep arrays in state
  this.setState({
    RegionSelectArray: updatedRegionsIds,
    RegionSelectedTextArray: updatedRegionsTexts,
    CountryItems: updatedCountryItems,
    CountriesSelectedArray: updatedCountrySelectedArray,
    CountriesSelectedTextArray: updatedCountrySelectedTextArray
  });

  // ✅ Convert to strings only for saving or logging
  AllRegionsFinalSavedIDValue = updatedRegionsIds.map((id: any) => id.toString().trim()).join(",");
  AllRegionsFinalSavedValue = updatedRegionsTexts.map((txt: any) => txt.trim()).join(",");

  console.log("Updated Regions (IDs):", AllRegionsFinalSavedIDValue);
  console.log("Updated Regions (Names):", AllRegionsFinalSavedValue);


      }

    
 
      
    }


    
     private async handleRegionsTest(myItems:[])
    {


      if(myItems.length>0)
      {

        var MyArra12:any=[];
        

         for(var count=0;count<myItems.length;count++)
         {


let ItemInfo12 = await this._service.getCountryID(myItems[count]);

for (var k in ItemInfo12) {
MyArra12.push({key: ItemInfo12[k].Id, text: ItemInfo12[k].Title});
}
}

this.setState({ CountryItems: MyArra12 });
   

      }
  

     
 

    }
    

    private async handleRegionCountries(event: React.FormEvent<HTMLDivElement>, item: IComboBoxOption): Promise<any>  {

      //alert(item.key);
    
       if(item.selected==true)
      {

      AllCountriesSelected.push({ key: item.key, text: item.text});

      
      AllCountrySavedValues.push(item.text);
      AllCountrySavedIDValues.push(item.key);

         var MyArray2:any=[];

      MyArray2=this.state.CountriesSelectedArray;
      MyArray2.push(item.key);

         this.setState(prevState => ({
  CountriesSelectedArray: [...prevState.CountriesSelectedArray]
  
}));


      var myAraay3:any=[];

      myAraay3=this.state.CountriesSelectedTextArray;
      myAraay3.push(item.text);

      this.setState({CountriesSelectedTextArray:myAraay3});

       const AllCountriesinstingValues: string[]=myAraay3;

      const AllCountriesIDvalues:string[]=MyArray2.map((item:any) => item.toString());

      AllCountryFinalSavedValue = AllCountriesinstingValues.map(text => text.trim()).join(",");
      AllCountryFinalSavedIDValue=AllCountriesIDvalues.map(text => text.trim()).join(",");
    

      }
      else
      {


      const updatedSelectedArray = this.state.CountriesSelectedArray.filter(
      (key: any) => key !== item.key
    );
    const updatedSelectedTextArray = this.state.CountriesSelectedTextArray.filter(
      (text: any) => text !== item.text
    );

    const updatedCountrySelectedArrayString: string = updatedSelectedArray.join(",");
    this.setState({UpdateCountryIdString:updatedCountrySelectedArrayString})


   const updatedSelectedTextArrayCountryString: string = updatedSelectedTextArray.join(",");

this.setState({CountryFinalStringValue:updatedSelectedTextArrayCountryString});

    // Also remove from global arrays
    AllCountriesSelected = AllCountriesSelected.filter((sd: any) => sd.key !== item.key);
    AllCountrySavedIDValues = AllCountrySavedIDValues.filter((id: any) => id !== item.key);
    AllCountrySavedValues = AllCountrySavedValues.filter((txt: any) => txt !== item.text);

    // Update state immutably
    this.setState({
      CountriesSelectedArray: updatedSelectedArray,
      CountriesSelectedTextArray: updatedSelectedTextArray
    });

 



      }

     
 
      
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

      WiproSynergyKey: option.key,
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
            this.setState({ isSaving: true });


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
          AllCountryFinalSavedIDValue,
          AllCountryFinalSavedValue,
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
             alert('Record submitted successfully');

            window.location.replace("https://capcoinc.sharepoint.com/sites/MarketHubSandbox/");
          
          
          });


          }

         
          }
       
    }
     
   private onApproveClick():void{

    let month1= (this.state.dtLastReview.getMonth()+1);

    let year1 =(this.state.dtLastReview.getFullYear());

    let FinalLastReviewDate1=month1+'/'+this.state.dtLastReview.getDate() +'/' +year1;
    

    console.log()

   this.setState({ isSaving: true });

      this._service.Approve(

        myitemId,
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
        FinalLastReviewDate1,
        (this.state.ContactId == null ? 0:this.state.ContactId.Id),
        this.state.WiproSynergyKey,
        this.state.desc,
        this.state.keywords,
        this.state.contentypeKey
      
      ).then(function (data:any)
        {
      
          alert('Record updated successfully');
          window.location.replace("https://capcoinc.sharepoint.com/sites/MarketHubSandbox/");
      
         
      
        });
      
        

   }

   
   private onRejectClick():void{

    let month1= (this.state.dtLastReview.getMonth()+1);

    let year1 =(this.state.dtLastReview.getFullYear());

    let FinalLastReviewDate1=month1+'/'+this.state.dtLastReview.getDate() +'/' +year1;

    this.setState({ isSaving: true });
   
      this._service.Reject(

        myitemId,
        this.state.Name,
        ContentType,
        // AllDomainsFinalSavedValue,
        // AllDomainsFinalSavedIDValue,
        updatedDomainTextsString,
        this.state.UpdateDomainIdString,
        AllSubDomainsFinalTextValues,
        AllSubDomainsFinalIDValue,
        AllServiceGroupsFinalSavedValue,
        AllServiceGroupsFinalSavedIDValue,
        AllServiceFinalSavedValue,
        AllServiceFinalSavedIDValue,
        FinalLastReviewDate1,
        (this.state.ContactId == null ? 0:this.state.ContactId.Id),
        this.state.WiproSynergy,
        this.state.desc,
        this.state.keywords,
        this.state.contentypeKey
      
      ).then(function (data:any)
        {
      
          alert('Record updated successfully');
      
         
      
        });
      
        

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
      <b><label className={styles.labelsFonts}>Title of Document1 <label className={styles.recolorss}>*</label></label></b><br/>  
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
         selectedKey={this.state.DomainSelectArray}
         defaultSelectedKey={this.state.DomainSelectArray}
         
         //onSelect={this.handleDomains.bind(this)}
         
          multiSelect={true}>
            </ComboBox>
 <br></br>

 <b><label className={styles.labelsFonts}>Sub Domains <label className={styles.recolorss} >*</label></label></b><br></br> 
    <ComboBox  styles={comboBoxStyles}
         placeholder="Select  SubDomains"
         options={this.state.SubDomainItems}
         onChange={this.handleDomainsandSubDomains.bind(this)}
         selectedKey={this.state.SubDomainSelectedArray}
         defaultSelectedKey={this.state.SubDomainSelectedArray}
         
         multiSelect={true}>
    </ComboBox>

<br></br>
    
  <b><label className={styles.labelsFonts}>Service Groups <label className={styles.recolorss} >*</label></label></b><br></br> 
   <ComboBox  styles={comboBoxStyles}
         placeholder="Select  Serivce Groups"
         options={this.state.ServiceGroupItems}
         onChange={this.handleServiceGroups.bind(this)}
           selectedKey={this.state.ServiceGroupsSelectedArray}
         defaultSelectedKey={this.state.ServiceGroupsSelectedArray}
         
          multiSelect={true}>
            </ComboBox>
 <br></br>

 <b><label className={styles.labelsFonts}>Services  <label className={styles.recolorss} >*</label></label></b><br></br> 
    <ComboBox  styles={comboBoxStyles}
         placeholder="Select  Services"
         options={this.state.ServicesItems}
         onChange={this.handleServiceGroupsandServices.bind(this)}
           selectedKey={this.state.ServicesSelectedArray}
         defaultSelectedKey={this.state.ServicesSelectedArray}
         
         multiSelect={true}>
    </ComboBox>
    <br></br>



    <b><label className={styles.labelsFonts}>Regions <label className={styles.recolorss} >*</label></label></b><br></br> 
   <ComboBox  styles={comboBoxStyles}
         placeholder="Select  Regions"
         options={this.state.RegionItems}
         onChange={this.handleRegions.bind(this)}
          selectedKey={this.state.RegionSelectArray}
         defaultSelectedKey={this.state.RegionSelectArray}
          multiSelect={true}>
            </ComboBox>
 <br></br>

 <b><label className={styles.labelsFonts}>Countries <label className={styles.recolorss} >*</label></label></b><br></br> 
    <ComboBox  styles={comboBoxStyles}
         placeholder="Select  Countries"
         options={this.state.CountryItems}
         onChange={this.handleRegionCountries.bind(this)}
          selectedKey={this.state.CountriesSelectedArray}
         defaultSelectedKey={this.state.CountriesSelectedArray}
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


<PrimaryButton text="Submit" onClick={this.OnBtnClick.bind(this)} styles={stackButtonStyles} className={styles.welcomeImage} 
disabled={this.state.isSaving}

/><br></br>


      </Stack>

       }

       {myitemId!="" &&
       <Stack>


<div className={styles.Divsection}> 
<b><label className={styles.labelsFonts}>Attachment<label className={styles.recolorss}>*</label></label></b><br/><br/>

{/* <input id="infringementFiles" type="file"  name="files[]"  onChange={this.changeFileuploadRecived.bind(this)} disabled={true}/> */}

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
         defaultSelectedKey={this.state.SubDomainSelectedArray}
         //selectedKey={numberArray1}
          multiSelect={true}>
            </ComboBox>
 <br></br>
   
   <b><label className={styles.labelsFonts}>Service Groups 12 <label className={styles.recolorss} >*</label></label></b><br></br> 
    <ComboBox  styles={comboBoxStyles}
         placeholder="Select  Service Groups"
         options={this.state.ServiceGroupItems}
         onChange={this.handleServiceGroups.bind(this)}
          selectedKey={this.state.ServiceGroupsSelectedArray}
         defaultSelectedKey={this.state.ServiceGroupsSelectedArray}
         //selectedKey={numberArray1}
          multiSelect={true}>
            </ComboBox>
            <br></br>

   <b><label className={styles.labelsFonts}>Services 12 <label className={styles.recolorss} >*</label></label></b><br></br> 
    <ComboBox  styles={comboBoxStyles}
         placeholder="Select  Services"
         options={this.state.ServicesItems}
         onChange={this.handleServiceGroupsandServices.bind(this)}
          selectedKey={this.state.ServicesSelectedArray}
         defaultSelectedKey={this.state.ServicesSelectedArray}
         //selectedKey={numberArray1}
          multiSelect={true}>
            </ComboBox>
            <br></br>

   <b><label className={styles.labelsFonts}>Region<label className={styles.recolorss} >*</label></label></b><br></br> 
   <b><label className={styles.labelsFonts}>{this.state.MyRegionName}</label></b><br></br> 

   <b><label className={styles.labelsFonts}>Country <label className={styles.recolorss} >*</label></label></b><br></br> 
   <b><label className={styles.labelsFonts}>{this.state.CountryName}</label></b><br></br> 
   
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

<Stack horizontal tokens={stackTokens1}>

<PrimaryButton text="Approve" onClick={this.onApproveClick.bind(this)} styles={stackButtonStyles} className={styles.welcomeImage} disabled={this.state.isSaving}/><br></br>
<PrimaryButton text="Reject" onClick={this.onRejectClick.bind(this)} styles={stackButtonStyles} className={styles.welcomeImage} disabled={this.state.isSaving}/><br></br>


        </Stack>
        </Stack>


       }
       
      </Stack>
     
    );
  }
}
