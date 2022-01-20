import React from 'react'
import { Card } from 'semantic-ui-react'
import { Empty } from 'antd';

const MessageBoardCard = (props) => {

    // messages to be retrieved from db
    const messages = [
        {
            "name": "Keenan",
            "message": "Hi Mel, Really good job with the code!",
            "timestamp":"11/08/2021",
            "sentiment": "positive"
        },
        {
            "name": "Joshua",
            "message": "Mel, thanks for guiding me with react!",
            "timestamp":"10/08/2021",
            "sentiment":"positive"
        },
        {
            "name": "Zoe",
            "message": "Mel, you are so good with backend!",
            "timestamp":"12/09/2021",
            "sentiment": "positive"
        },
        {
            "name": "Senpai",
            "message": "I have noticed Mel",
            "timestamp":"11/12/2021",
            "sentiment": "neutral"
        },
        {
            "name": "John Doe",
            "message": "Mel, sometimes you are too hot. Keep your coolz.",
            "timestamp":"13/09/2021",
            "sentiment": "negative"
        },
        {
            "name": "doge",
            "message": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
            "timestamp":"13/09/2021",
            "sentiment": "neutral"
        },
    
    ]

    function cardOutline(sentiment){
        if (sentiment == "positive"){
            return("green")
        }
        else if (sentiment == "neutral"){
            return("blue");
        }
        else {
            return("red")
        }
    }
    function cardColor(sentiment){
        if (sentiment == "positive"){
            return({
                backgroundColor:"rgba(33, 186, 69, 0.1)",
            })
        }
        else if (sentiment == "neutral"){
            return({
                backgroundColor:"rgba(24, 144, 255, 0.1)"
                
            })
        }
        else {
            return({
                backgroundColor:"rgba(255, 0, 0, 0.1)",
                
            })
        }
    }
    
    function filterMessage(sentiment, messages) {
        // retrieve messages with sentiment
        var filteredMessages = []

        if (sentiment == "all"){
            filteredMessages = messages
        }
        else {
            filteredMessages = messages.filter(function (message) {
                return message.sentiment === sentiment;
              });
        }

        console.log(filteredMessages);

        
        // if message with sentiment exist, return the corresponding cards
        // if not return empty
        
        
        return(
           <>

            { //Check if message failed
                filteredMessages
                  ? (filteredMessages.map((message)=>{
                      return(
                            <Card color={cardOutline(message.sentiment)} style={cardColor(message.sentiment)}>
                                <Card.Content>
                                    <Card.Header style={{minHeight:"2vh"}}>{message.name}</Card.Header>
                                    <Card.Meta>{message.timestamp}</Card.Meta>
                                    <Card.Description style={{minHeight:"15vh"}}>
                                    {message.message}
                                    </Card.Description>
                                    
                            
                                </Card.Content>
                            </Card>    
                                             
                      );
                  }))
                  : (<Empty description={<span style={{ color: "#CCC" }}> No Data</span>}/>)
            }
        </>

        );
    }

    // {filterMessage(props.sentiment, messages)}
    
    return (
        
            
        <Card.Group>
            {filterMessage(props.sentiment, messages)}
            {/* <Card>
                <Card.Content>
                    <Card.Header>Matthew Harris</Card.Header>
                    <Card.Meta>Co-Worker</Card.Meta>
                    <Card.Description>
                    Matthew is a pianist living in Nashville.
                    </Card.Description>
                </Card.Content>
            </Card>
            
            <Card>
                <Card.Content>
                    <Card.Header>Matthew Harris</Card.Header>
                    <Card.Meta>Co-Worker</Card.Meta>
                    <Card.Description>
                    Matthew is a pianist living in Nashville.
                    </Card.Description>
                </Card.Content>
            </Card>
            <Card>
                <Card.Content>
                    <Card.Header content='Jake Smith' />
                    <Card.Meta content='Musicians' />
                    <Card.Description content='Jake is a drummer living in New York.' />
                </Card.Content>
            </Card>
            <Card>
                <Card.Content
                    header='Elliot Baker'
                    meta='Friend'
                    description='Elliot is a music producer living in Chicago.'
                />
            </Card>
            <Card
                header='Jenny Hess'
                meta='Friend'
                description='Jenny is a student studying Media Management at the New School'
            />
            <Card
                header='Jenny Hess'
                meta='Friend'
                description='Jenny is a student studying Media Management at the New School'
            /> */}
        </Card.Group>
        
    );
}

export default MessageBoardCard;