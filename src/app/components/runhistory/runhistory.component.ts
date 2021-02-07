import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { Runhistory } from 'src/app/common/runhistory';
import { RunhistoryService } from 'src/app/services/runhistory.service';


@Component({
  selector: 'app-runhistory',
  templateUrl: './runhistory.component.html',
  styleUrls: ['./runhistory.component.css']
})
export class RunhistoryComponent implements AfterViewInit {
  //Mark RunID autogenerated vakue for backend perpose
  displayedColumns: string[] = ['Seq','RunId','RunBy','Environment','URL','ExecutionDateTime','Duration','Passed','Failed','Skipped','Status'];
  runhistory : Runhistory[];
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  rowRenderIndex=0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  pagetitle="Run History";

  constructor(private runhistoryservice : RunhistoryService){}
  
  ngAfterViewInit(): void {
    this.getResults();
  }

  getResults() {
   return  this.runhistoryservice.getrunHistory().subscribe(
    data=>{
      this.runhistory=data;
      this.isLoadingResults = false;
      this.resultsLength = this.runhistory.length;
    }
   )
  }
}
  