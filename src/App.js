import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

const DISPLAY_LENGTH = 5;
function App() {

  const [bufferIndex, setBufferIndex] = useState(-1);
  const [messageHistory, setMessageHistory] = useState([
    { text: 'Hi Message', type: 'prompt', promptCounter: 1, isBlur: false },
    { text: 'Hi Message', type: 'prompt', promptCounter: 2, isBlur: false },
    { text: 'Hi Message', type: 'prompt', promptCounter: 3, isBlur: false },
    { text: 'Hi Message', type: 'prompt', promptCounter: 4, isBlur: false },
    { text: 'Hi Message', type: 'prompt', promptCounter: 5, isBlur: false },
    { text: 'Hi Message', type: 'prompt', promptCounter: 1, isBlur: false },
    { text: 'Hi Message', type: 'prompt', promptCounter: 2, isBlur: false },
    { text: 'Hi Message', type: 'prompt', promptCounter: 3, isBlur: false },
    { text: 'Hi Message', type: 'prompt', promptCounter: 4, isBlur: false },
  ]);

  const getNewPromptCounter = (messages) => {
    const defaultCounter = 1;
    const firstCounter = 1;
    if (messages) {
      const lastIndex = messages.length - 1;
      let counter = messages.at(-1)?.promptCounter || defaultCounter;
      if (counter === DISPLAY_LENGTH || lastIndex === bufferIndex) {
        counter = firstCounter;
      }
      else {
        counter = counter + 1;
      }
      return counter;
    }
    else return defaultCounter;
  }

  const markEveryItemBlur = (messages) => {
    return messages.map(item => ({ ...item, isBlur: true }));
  }

  const initializeMessageHistoryWithCountAndBlur = (messages) => {
    let itemsToRemainUnblurAfterBufferIndex = (messages.length - (bufferIndex + 1)) % DISPLAY_LENGTH;
    if (itemsToRemainUnblurAfterBufferIndex == 0) {
      itemsToRemainUnblurAfterBufferIndex = DISPLAY_LENGTH;
    }

    console.log({ itemsToRemainUnblurAfterBufferIndex })

    // [1,2,3,4,5,6,7,8,9,10,11,12] = len = 12, index=11
    const modifiedMessages = [...markEveryItemBlur(messages)];
    for (let i = modifiedMessages.length - 1; i > modifiedMessages.length - 1 - itemsToRemainUnblurAfterBufferIndex; i--) {
      if (i > bufferIndex) {
        modifiedMessages[i].isBlur = false;
      }
    }

    return modifiedMessages;
  }

  console.log('bufferIndex', bufferIndex)
  console.log('messageHistory', messageHistory)

  useEffect(() => {
    if (messageHistory) {
      setMessageHistory(initializeMessageHistoryWithCountAndBlur(messageHistory));
    }
  }, [])

  useEffect(() => {
    const updatedMessage = initializeMessageHistoryWithCountAndBlur(messageHistory);
    setMessageHistory(updatedMessage);
  }, [bufferIndex])

  const onAddTopicHandler = () => {
    const _bufferIndex = messageHistory.length - 1;
    setBufferIndex(_bufferIndex);
  }

  const onAddMessageHandler = () => {
    const newPromptCounter = getNewPromptCounter(messageHistory);
    const newMessage = { text: 'Hi Message', type: 'prompt', promptCounter: newPromptCounter, isBlur: false };
    const updatedMessage = initializeMessageHistoryWithCountAndBlur([...messageHistory, newMessage]);
    setMessageHistory(updatedMessage);
  }

  const getBlurStyle = (isBlur) => {
    if (isBlur) return ({ border: '1px solid red' })
  }

  return (
    <div className="App" style={{ margin: '10px' }}>
      {messageHistory.map(m => {
        return (
          <div style={getBlurStyle(m.isBlur)}>
            Message: {m.text}, counter: {m.promptCounter}
          </div>
        )
      })}

      <br /><br />
      <button onClick={onAddTopicHandler}>Add Topic</button>
      <button onClick={onAddMessageHandler}>Add Message</button>
    </div>
  );
}

export default App;
