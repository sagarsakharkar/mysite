import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import format from 'date-fns/format';

function AssetInfo(props) {
    const data = props.data;
    const users = props.users;

    if (!data) {
        return null
    }

    return (
        <CardContent>
            <div className="mb-24">
                <Typography className="font-bold mb-4 text-15">UID</Typography>
                <Typography>{data.uid}</Typography>
            </div>
            <div className="mb-24">
                <Typography className="font-bold mb-4 text-15">Name</Typography>
                <Typography>{data.name}</Typography>
            </div>
            <div className="mb-24">
                <Typography className="font-bold mb-4 text-15">Type</Typography>
                <Typography>{data.asset_type}</Typography>
            </div>
            <div className="mb-24">
                <Typography className="font-bold mb-4 text-15">Prefix</Typography>
                <Typography>{data.prefix}</Typography>
            </div>
            <div className="mb-24">
                <Typography className="font-bold mb-4 text-15">Client Name</Typography>
                <Typography>{data.client_name}</Typography>
            </div>
            <div className="mb-24">
                <Typography className="font-bold mb-4 text-15">Description</Typography>
                <Typography>{data.description}</Typography>
            </div>
            <div className="mb-24">
                <Typography className="font-bold mb-4 text-15">Created Date</Typography>
                <Typography>{data.created_at && format(new Date(data.created_at), 'dd-MM-y hh:mm:ss')}</Typography>
            </div>

        </CardContent>
    );
}
export default AssetInfo;
