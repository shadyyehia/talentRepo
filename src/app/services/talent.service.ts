import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ITalent, IGroup } from '../model/ITalent';
import 'rxjs/add/operator/map';
declare var $: any;
@Injectable()
export class TalentService {

    constructor(private _http: Http) {

        this.storage = {};
    }
    
    getData(): Observable<any> {
        return this._http.get("./assets/data/data.json")
            .map((response: Response) => {
                var jsonResult = response.json();               
                this.storage.talents = jsonResult.talents;
                this.storage.groups = jsonResult.groups;
                return this.storage;
            });
            //.catch(this.handleError);
    }
   
    public storage: any;

    get isTalentsEmpty(): boolean {
        return this.storage.talents === null || this.storage.talents === undefined;
    }
    get isGroupsEmpty(): boolean {
        return this.storage.groups === null || this.storage.groups === undefined;
    }

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        //console.error(error);
        return Observable.throw(error.statusText || 'Server error');
    }
    removeFromArrayOfObjects(array, prop, value): any[] {
        var removeIndex = array.map(function (item) { return item[prop]; })
            .indexOf(value);

        ~removeIndex && array.splice(removeIndex, 1);
        return array;
    }
   
    removeGroup(groupID): boolean {
        var Allgroups = [];
        this.storage.talents.forEach(function (obj) {
            Allgroups = Allgroups.concat(obj.groups);
        });
        var uniqList = new Set(Allgroups);
        if (uniqList.has(groupID))
            return false;
        else {
            this.removeFromArrayOfObjects(this.storage.groups, "id", groupID);
            return true;
        }
        //if (this.storage.talents.some(t => t.groups.some(x => x == groupID))
        //{
        //}
        

    }
    removeFromArray(array, item)
    {
        var removeItem = item;

        array = $.grep(array, function (value) {
            return value != removeItem;
        });
        return array;
        
    }
    getTalentByID(talentID)
    {
        return this.storage.talents.filter(x => x.id == talentID);
    }
    addToGroup(talent,groupID)
    {
        talent.groups.push(groupID);
        this.storage.groups.forEach(g => {
            if (g.id == groupID)
                g.memberCount = g.memberCount + 1;
        });
        
    }
    addNewGroup(group, talentIDs: string[])
    {
        this.storage.groups.push(group);
        this.storage.talents.forEach(t => {
            if (talentIDs.some(tid => t.id == tid)) {
                t.groups.push(group.id);
            }
        });
    }
    addNewTalent(talent)
    {
        this.storage.talents.push(talent);
    }
}
