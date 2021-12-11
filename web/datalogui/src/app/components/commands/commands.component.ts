import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Command } from 'src/app/classes/commands';
import { SysutilService, RunOperator } from 'src/app/services/sysutil.service';


@Component({
  selector: 'app-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.css']
})
export class CommandsComponent implements OnInit {

  commands: RunOperator[] = []
  configCommands: Command[] = []
  runit: string = ""
  
  constructor(private sysutilService: SysutilService) { 
    sysutilService.getConfigCommands().subscribe(c => this.configCommands = c)
  }

  ngOnInit(): void {
  }

  runIt(shcommand: string) {
    this.sysutilService.runShCommand(shcommand).subscribe(value => {
      this.commands = []
      this.commands = this.sysutilService.commands;
    })
  }

  addToConfig() {
    let name = prompt("New command name:")
    if(name != null) {
      let newCommand = new Command()
      newCommand.name = name
      newCommand.template = this.runit
      this.configCommands.push(newCommand)
      this.sysutilService.saveConfigCommands(this.configCommands)
        .subscribe(v => this.sysutilService.getConfigCommands().subscribe(c => this.configCommands = c))
    }
  }

  refreshlog(command: RunOperator) {
    this.sysutilService.refreshLog(command).subscribe(value => {
      command.log = value
    })
  }  

}
