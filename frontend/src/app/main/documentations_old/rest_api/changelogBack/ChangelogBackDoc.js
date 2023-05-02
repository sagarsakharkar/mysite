import Typography from '@mui/material/Typography';
import ChangelogBackCard from './ChangelogBackCard';

const changelogBackData = [
  {
    version: '3.0.0',
    date: '2022-01-11',
    newChanges: [
      
    ],
    fixedChanges: ["MyTask board fixed"],
  },
];

function ChangelogBackDoc() {
  return (
    <>
      <Typography variant="h4" className="mb-24 font-normal">
        Changelog
      </Typography>

      {changelogData.map((item) => (
        <ChangelogCard className="mb-24" key={item.version} {...item} />
      ))}
    </>
  );
}

export const fuseReactLatestVersion = changelogData[0].version;

export default ChangelogBackDoc;
