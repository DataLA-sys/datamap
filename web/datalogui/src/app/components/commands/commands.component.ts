import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Project } from 'src/app/classes/project';
import { EventService } from 'src/app/services/events.service';
import { SysutilService, RunOperator } from 'src/app/services/sysutil.service';


@Component({
  selector: 'app-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.css']
})
export class CommandsComponent implements OnInit {

  commands: RunOperator[] = []
  runit: string = ""
  
  constructor(private sysutilService: SysutilService, private eventService: EventService) { 
  }

  ngOnInit(): void {
  }

  runIt(shcommand: string) {
    this.sysutilService.runShCommand(shcommand).subscribe(value => {
      this.commands = []
      this.commands = this.sysutilService.commands;
    })
  }

  refreshlog(command: RunOperator) {
    this.sysutilService.refreshLog(command).subscribe(value => {
      command.log = value
    })
  }  

}
