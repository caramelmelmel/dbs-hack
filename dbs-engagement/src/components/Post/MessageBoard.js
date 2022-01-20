import React, { useState } from 'react';

import Navbar from './Navbar';
import MessageBoardSidebar from './MessageBoardSidebar';
import MessageBoardCard from './MessageBoardCard';

import { Button as SemButton , Icon, Header, Modal, Input  } from 'semantic-ui-react'
import { Button as AntdButton, Radio } from 'antd';
// import { Form, Radio } from 'semantic-ui-react'

const MessageBoard = () => {
    const [sentiment, setSentiment] = useState("all")

    // modal control
    const [firstOpen, setFirstOpen] = React.useState(false)
    const [secOpen, setSecOpen] = React.useState(false)

    // radio button group
    function onChange(e) {
        console.log(`radio checked:${e.target.value}`);
       
      }
    
    return (
        <div>
            {/* show no purple buttons */}
            <Navbar addNewVisibility={"hidden"}/>
            
            <MessageBoardSidebar sentimentCallback={setSentiment}>
                <h1 style={{display:"inline-block"}}>Message Wall</h1>
                <Modal
                    onClose={() => setFirstOpen(false)}
                    onOpen={() => setFirstOpen(true)}
                    open={firstOpen}
                    trigger={   
                    <SemButton 
                        color="blue" 
                        style={{textAlign:"left", marginLeft:"2em", borderRadius:"10px"}} 
                        icon 
                        labelPosition='left'
                        
                        // onClick={}
                    >
                        <Icon name='plus' />
                        Add New Messages
                    </SemButton>
                    }
                    size={"small"}
                >
                    <Header 
                        icon={<Icon color='blue' 
                        name="paper plane outline"></Icon>} 
                        content="Add a new message for your peers"
                        style={{minHeight:"10vh"}}></Header>
                        <Modal.Content  style={{padding:"1em"}}>
                            <h3>To: Teammate</h3>
                            
                            <hr />

                            
                            {/* <br style={{lineHeight: 2}} />  */}
                            <br />
                            <br />
                            
                            <Input 
                                fluid
                                icon='comment alternate outline' 
                                iconPosition='left' 
                                placeholder='Enter message here...' 
                            />
                        </Modal.Content>
                        <Modal.Actions>
                            <SemButton 
                                color='black' 
                                icon='cancel'
                                onClick={() => setFirstOpen(false)}
                                content="cancel"
                                
                            
                            />
                                {/* Cancel
                            </Button> */}
                            {/* <Button
                                content="Done"
                                labelPosition='right'
                                icon='checkmark'
                                onClick={() => setSecOpen(true)}
                                positive
                            /> */}
                             <SemButton
                                    icon='check'
                                    content='done'
                                    positive
                                    onClick={() => 
                                        {setSecOpen(true);
                                        
                                        }
                                    }
                                />
                        </Modal.Actions>

                        <Modal
                            onClose={() => setSecOpen(false)}
                            open={secOpen}
                            size='mini'
                            >
                            <Modal.Header
                                style={{minHeight:"1vh"}}
                            >Confirm Submission</Modal.Header>
                            <Modal.Content>
                                <p>Are you sure you want to submit the message to your teammate?</p>
                            </Modal.Content>
                            <Modal.Actions>
                                <SemButton
                                    icon='pencil'
                                    content='edit'
                                    onClick={() => 
                                        {setSecOpen(false);
                                        }
                                    }
                                />
                                <SemButton
                                    icon='check'
                                    content='yes'
                                    positive
                                    onClick={() => 
                                        {setSecOpen(false);
                                        setFirstOpen(false);
                                        }
                                    }
                                />
                                
                            </Modal.Actions>
                        </Modal>
                    </Modal>
            
             
                <br />
                <br />
                <MessageBoardCard sentiment={sentiment} />
                {console.log(sentiment)}
            </MessageBoardSidebar>
            
            
        </div>
    );
}

export default MessageBoard;