import FuseHighlight from '@fuse/core/FuseHighlight';
import Typography from '@mui/material/Typography';

function OverviewDoc() {
  return (
    <>
      <Typography variant="h6" className="mb-24">
        Project Overview
      </Typography>

      <Typography className="mb-16" component="p">
        When tasks go through a specific process or move through multiple stages, you can create a pipeline project and share it with your team. <br></br>You can create a project for any workflow or process, like Animation, Lighting, Modeling, etc. Here are features to help you get project work flows into ATOM:
      </Typography>
      <Typography className="mb-16" component="p">
        <code>Note</code>: Coordinator can create new project from this section.
      </Typography>
      <Typography variant="h4" className="mb-24">
        Notes
      </Typography>
      <img
        src="static/assets/images/documentation/view_project.png"
        alt="view_project"
      />
      <Typography className="mb-32" component="p">
        It will shows you Notes related to project.
      </Typography>
      <Typography variant="h4" className="mb-24">
        Info
      </Typography>
      <img
        src="static/assets/images/documentation/view_project_info.png"
        alt="view_project_info"
      />
      <Typography className="mb-32" component="p">
        It will shows you Info related to project.
      </Typography>
      <Typography variant="h4" className="mb-24">
        Activity
      </Typography>
      <img
        src="static/assets/images/documentation/view_project_activity.png"
        alt="view_project_activity"
      />
      <Typography className="mb-32" component="p">
        It will shows you activity related to project.
      </Typography>
      <Typography variant="h4" className="mb-24">
        Assets
      </Typography>
      <img
        src="static/assets/images/documentation/view_project_asset.png"
        alt="view_project_asset"
      />
      <Typography className="mb-32" component="p">
        It will shows you assets related to project.
      </Typography>
      <Typography variant="h4" className="mb-24">
        Episodes
      </Typography>
      <img
        src="static/assets/images/documentation/view_project_episode.png"
        alt="view_project_episode"
      />
      <Typography className="mb-32" component="p">
        It will shows you episodes related to project.
      </Typography>
      <Typography variant="h4" className="mb-24">
        Sequences
      </Typography>
      <img
        src="static/assets/images/documentation/view_project_sequence.png"
        alt="view_project_sequence"
      />
      <Typography className="mb-32" component="p">
        It will shows you sequences related to project.
      </Typography>
      <Typography variant="h4" className="mb-24">
        Shots
      </Typography>
      <img
        src="static/assets/images/documentation/view_project_shot.png"
        alt="view_project_shot"
      />
      <Typography className="mb-32" component="p">
        It will shows you shots related to project.
      </Typography>
      <Typography variant="h4" className="mb-24">
        Steps
      </Typography>
      <img
        src="static/assets/images/documentation/view_project_step.png"
        alt="view_project_step"
      />
      <Typography className="mb-32" component="p">
        It will shows you steps related to project.
      </Typography>
      <Typography variant="h4" className="mb-24">
        Tasks
      </Typography>
      <img
        src="static/assets/images/documentation/view_project_task.png"
        alt="view_project_task"
      />
      <Typography className="mb-32" component="p">
        It will shows you tasks related to project.
      </Typography>
      <Typography variant="h4" className="mb-24">
        Versions
      </Typography>
      <img
        src="static/assets/images/documentation/view_project_version.png"
        alt="view_project_version"
      />
      <Typography className="mb-32" component="p">
        It will shows you versions related to project.
      </Typography>
    </>
  );
}

export default OverviewDoc;
