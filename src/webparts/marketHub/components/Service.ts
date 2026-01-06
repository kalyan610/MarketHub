import { sp } from "@pnp/sp/presets/all";
import "@pnp/sp/webs";
import "@pnp/sp/folders";
import "@pnp/sp/lists";
import "@pnp/sp/views";
import "@pnp/sp/items";
import "@pnp/sp/site-users/web";
import "@pnp/sp/fields";
import "@pnp/sp/attachments";
import "@pnp/sp/files";

export default class Service {

    public mysitecontext: any;

    public constructor(siteUrl: string, Sitecontext: any) {
        this.mysitecontext = Sitecontext;


        sp.setup({
            sp: {
                baseUrl: siteUrl

            },
        });

    }

     public async GetAllContentTypes():Promise<any>
    {
 
     return await sp.web.lists.getByTitle("ContentType").items.select('Title','ID').expand().get().then(function (data:any) {
 
     return data;
 
 
     });
 
 
    }


     public async GetAllDomains():Promise<any>
    {
 
     return await sp.web.lists.getByTitle("Domains").items.select('Title','ID').expand().get().then(function (data:any) {
 
     return data;
 
 
     });
 
 
    }


     public async getSubdomainsbyID(ItemID: any): Promise<any> {
     

    return await sp.web.lists.getByTitle("SubDomain").items.select('Title','ID').expand().filter("Domain/Id eq '" + ItemID + "'").get().then(function (data:any) {
 
     return data;

});


    }


     public async GetAllServiceGroups():Promise<any>
    {
 
     return await sp.web.lists.getByTitle("Service Groups").items.select('Title','ID').expand().get().then(function (data:any) {
 
     return data;
 
 
     });
 
 
    }

 public async getServicesID(ItemID: any): Promise<any> {
     

    return await sp.web.lists.getByTitle("Services").items.select('Title','ID').expand().filter("ServiceGroup/Id eq '" + ItemID + "'").get().then(function (data:any) {
 
     return data;

});


    }


 

       public async getUserByLogin(LoginName:string):Promise<any>{
        try{
            const user = await sp.web.siteUsers.getByLoginName(LoginName).get();
            return user;
        }catch(error){
            console.log(error);
        }
    }


    public async getUserByEmail(email: string): Promise<any | null> {
    if (!email || email.trim() === "") return null;

    try {
        // Ensures the user exists in the site collection and returns user info
        const user = await sp.web.ensureUser(email);
        return user.data; // Returns user object (Id, Title, Email, LoginName, etc.)
    } catch (error) {
        console.error(`Failed to get user by email "${email}":`, error);
        return null;
    }
}

    public Test()
    {

        //console.log(this.Save("","","2","","","","","","","","","",2,"","","","","","","",2,""));
    console.log(this.Save("","","","","","","","","","","","","","","",[],"","","",2,""));
     console.log(this.Approve(2,"","","","","","","","","","",[],"","","",2));
      console.log(this.Reject(2,"","","","","","","","","","",[],"","","","",2));

    }



     public async GetAllRegions():Promise<any>
    {
 
     return await sp.web.lists.getByTitle("Regions").items.select('Title','ID').expand().get().then(function (data:any) {
 
     return data;
 
 
     });
 
 
    }

 public async getCountryID(ItemID: any): Promise<any> {

    
    return await sp.web.lists.getByTitle("Country").items.select('Title','ID').expand().filter("Region/Id eq '" + ItemID + "'").get().then(function (data:any) {
 
     return data;

});


    }


      private async Save (
        YourName:string,
        MyContentType:string,
        MyDomainsText:string,
        MyDomainIDS:string,
        MySubDomainsText:string,
        MySubDomainIDS:string,
        MyServiceGroups:string,
        MyServiceGroupIDs:string,
        MyServices:string,
        MyServiceIDS:string,
        MyRegions:string,
        MyRegionIDS:string,
        MyCountryID:string,
        MyCountries:String,
        
        MyClientname:string,
        MyContactName:[],
        MyWiproSynergy:string,
        //MyLastReviewDate:string,
        MyDescription:string,
        MyKeywords:string,
        MyContentTypeKey:Number,

        acceptedFiles:any)  {

        let Myval='Completed';
    
        try
        {


          let file=acceptedFiles;
          let VarMyArra={"results":MyContactName};
    
          let Varmyval= await sp.web.lists.getByTitle("MarketHub Submission Review").items.add({
    
            Name:YourName,
            ContentTypes:MyContentType,
            Domains:MyDomainsText,
            DomainIDS:MyDomainIDS,
            SubDomains:MySubDomainsText,
            SubDomainIDS:MySubDomainIDS,
            ServiceGroups:MyServiceGroups,
            ServiceGroupIDS:MyServiceGroupIDs,
            Services:MyServices,
            ServicesIDS:MyServiceIDS,
            Regions:MyRegions,
            RegionIDS:MyRegionIDS,
            CountryIDS:MyCountryID,
            Countries:MyCountries,
            Client:MyClientname,
            ContactPersonId:VarMyArra,
            WiproSynergy:MyWiproSynergy,
            //LastReview:MyLastReviewDate,
             Description:MyDescription,
            Keywords:MyKeywords,

            ReqcontenttypeID:MyContentTypeKey,
            Title:"Record Saved"
    
        }).then (async r => {
          // this will add an attachment to the item we just created to push t sharepoint list
    
        for(var count=0;count<file.length;count++)
        {
         await r.item.attachmentFiles.add(file[count].name, file[count]).then(result => {
        console.log(result);
    
          })
    
        }
    
        return Myval;
    
    
    
        })
    
        
        return Varmyval;
    
      }
    
    
    
      catch (error) {
        console.log(error);
      }
    
    
      
     }

    public async getItemByID(ItemID: any): Promise<any> {
    try {

const selectedList = 'MarketHub Submission Review';
const Item: any[] = await sp.web.lists.getByTitle(selectedList).items.select("*,Title,ContactPerson/EMail,Attachments,AttachmentFiles").expand("ContactPerson/EMail,AttachmentFiles").filter("ID eq '" + ItemID + "'").get();
        return Item[0];
    } catch (error) {
        console.log(error);
    }
}


public async getRegionbyTitle(MyTitle:any):Promise<any> {

 try {

const selectedList = 'Country';
const Item: any[] = await sp.web.lists.getByTitle(selectedList).items.select("*,Title").filter("Title eq '" + MyTitle + "'").get();
        return Item[0];
    } catch (error) {
        console.log(error);
    }
}

public async getRegionName(ItemID:any):Promise<any> {

 try {

const selectedList = 'Regions';
const Item: any[] = await sp.web.lists.getByTitle(selectedList).items.select("*,Title").filter("ID eq '" + ItemID + "'").get();
        return Item[0];
    } catch (error) {
        console.log(error);
    }
}


private async Approve(
    
        MyRecordId:number,
        YourName:string,
        MyContentType:string,

        MyDomainsText:string,
        MyDomainIDS:string,
        MySubDomainsText:string,
        MySubDomainIDS:string,
        MyServiceGroups:string,
        MyServiceGroupIDs:string,
        MyServices:string,
        MyServiceIDS:string,
        //MyLastReviewDate:string,
        MyContactName:[],
        MyWiproSynergy:string,
        MyDescription:string,
        MyKeywords:string,
        
        MyContentTypeKey:Number,
        
)
    {

       let MyListTitle='MarketHub Submission Review';

        try
        {
    
        let list = sp.web.lists.getByTitle(MyListTitle);
        let VarMyArra={"results":MyContactName};
        let Varmyval = await list.items.getById(MyRecordId).update({

        //Emp Update
        
            Name:YourName,
            ContentTypes:MyContentType,

            Domains:MyDomainsText,
            DomainIDS:MyDomainIDS,

            SubDomains:MySubDomainsText,
            SubDomainIDS:MySubDomainIDS,

            ServiceGroups:MyServiceGroups,
            ServiceGroupIDS:MyServiceGroupIDs,

            Services:MyServices,
            ServicesIDS:MyServiceIDS,
            //LastReview:MyLastReviewDate,
            ContactPersonId:VarMyArra,

            WiproSynergy:MyWiproSynergy,
            Description:MyDescription,
            Keywords:MyKeywords,
            ReqcontenttypeID:MyContentTypeKey,
            Title:"Record Approved",
            Status:"Approved"
        
    }).then (async r => {

        });

        return Varmyval;

        }

    
      catch (error) {
        console.log(error);
      }
      

    }

private async Reject(
    
        MyRecordId:number,
        YourName:string,
        MyContentType:string,

        MyDomainsText:string,
        MyDomainIDS:string,
        MySubDomainsText:string,
        MySubDomainIDS:string,
        MyServiceGroups:string,
        MyServiceGroupIDs:string,
        MyServices:string,
        MyServiceIDS:string,
        //MyLastReviewDate:string,
        MyContactName:[],
        MyWiproSynergy:string,
        MyDescription:string,
        MyKeywords:string,
        Mycomments:string,
        MyContentTypeKey:Number,
        
)
    {

       let MyListTitle='MarketHub Submission Review';

        try
        {
    
        let list = sp.web.lists.getByTitle(MyListTitle);
        let VarMyArra={"results":MyContactName};
        let Varmyval = await list.items.getById(MyRecordId).update({

        //Emp Update
        
            Name:YourName,
            ContentTypes:MyContentType,

            Domains:MyDomainsText,
            DomainIDS:MyDomainIDS,

            SubDomains:MySubDomainsText,
            SubDomainIDS:MySubDomainIDS,

            ServiceGroups:MyServiceGroups,
            ServiceGroupIDS:MyServiceGroupIDs,

            Services:MyServices,
            ServicesIDS:MyServiceIDS,
            //LastReview:MyLastReviewDate,
            ContactPersonId:VarMyArra,

            WiproSynergy:MyWiproSynergy,
            Description:MyDescription,
            Keywords:MyKeywords,
            Comments:Mycomments,
            ReqcontenttypeID:MyContentTypeKey,
            Title:"Record Rejected",
            Status:"Rejected"
        
    }).then (async r => {

        });

        return Varmyval;

        }

    
      catch (error) {
        console.log(error);
      }
      

    }


        public async getItemByID1(ItemID: any): Promise<any> {
    try {

const selectedList = 'Services';
const Item: any[] = await sp.web.lists.getByTitle(selectedList).items.select("ServiceName").filter("ID eq '" + ItemID + "'").get();
        return Item[0];
    } catch (error) {
        console.log(error);
    }
}



}