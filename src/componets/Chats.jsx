import { Chat } from './index';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

const useStyles = makeStyles(() => ({
    chats: {
        height: 400,
        padding: '0',
        overflow: 'auto'
    }
}));

const Chats = (props) => {
    const classes = useStyles();

    return (
        <List className={classes.chats} id={"scroll-area"}>
            {props.chats.map((chat, index) => {
                return <Chat text={chat.text} type={chat.type} key={index.toString()} />
            })}
        </List>
    )
}

export default Chats;