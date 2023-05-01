import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../services/project-service/project.service';
import {Project} from '../../interfaces/project';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent implements OnInit {
  public projects: Project[];

  constructor(private projectService: ProjectService, private toastr: ToastrService) { }

  ngOnInit(): void {
    const getSub = this.projectService.getProjects().subscribe(projects => {
      this.projects = projects;
    });
    getSub.unsubscribe();
  }

  deleteProject(name: string): void {
    const deleteProject = this.projectService.deleteProject(name).subscribe(projects => {
      this.toastr.success(`Successfully deleted project ${name}`, 'Project');
      this.projects = projects;
    },
      err => this.toastr.error(err, 'Project')
    );
    deleteProject.unsubscribe();
  }


}
