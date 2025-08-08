// components/ChatDialog.js
import { useState, useEffect } from 'react';
import { useDarkMode } from '../context/ThemeColorContext';

export default function ChatDialog({ onEmotionChange }) {
  const { isDarkMode } = useDarkMode();
  const [messages, setMessages] = useState([]);
  const [currentOptions, setCurrentOptions] = useState([]);
  // 对话数据 - 添加emotion字段控制表情
  const dialogData = {
    start: {
      text: "你好啊,今天要聊天吗?",
      speaker: "ithalic",
      emotion: "me", 
      options: [
        { text: "你是谁", next: "about" },
        { text: "*其他功能", next: "other" },
        { text: "好啊,很高兴见到你", next: "chat" },
        { text: "不了,我还想在这里逛逛", next: "end" }
      ]
    },
    startB: {
      text: "我们继续吧",
      speaker: "ithalic",
      emotion: "me",
      options: [
        { text: "你是谁", next: "about" },
        { text: "*其他功能", next: "other" },
        { text: "好啊,很高兴见到你", next: "chat" },
        { text: "不了,我还想在这里逛逛", next: "end" }
      ]
    },
    chat: {
      text: "没想到你真的想聊天,谢谢你,我还没准备好,请稍后再来!",
      speaker: "ithalic",
      emotion: "oooo", 
      options: [
        { text: "这样啊(返回上级)", next: "startB" }
      ]
    },
    about: {
      text: "很荣幸向您介绍!这里是我的对话脚本,我是ithalic,发音是/ɪ'θa:lɪk/,或者叫我斜倾,是出生于中国的年轻女士,生日是2010年2月21日9点13分(utc+8),在这里就是Artisthalic的站长啦,目前是住宿制高中生,两周放一次假,所以网站更新频率会很慢-_-请原谅!",
      speaker: "ithalic",
      emotion: "enjoy", 
      options: [
        { text: "为什么想建立这个网站", next: "why" },
        { text: "听说你喜欢动画师们", next: "animators" },
        { text: "这样啊(返回上级)", next: "startB" }
      ]
    },
    aboutB: {
      text: "还有什么想问的吗",
      speaker: "ithalic",
      emotion: "me",
      options: [
        { text: "为什么想建立这个网站", next: "why" },
        { text: "听说你喜欢动画师们", next: "animators" },
        { text: "没有了(返回上级)", next: "startB" }
      ]
    },
    other: {
      text: "开发中...敬请期待!",
      speaker: "ithalic",
      emotion: "enjoy", 
      options: [
        { text: "这样啊(返回上级)", next: "startB" }
      ]
    },
    end: {
      text: "玩的开心!",
      speaker: "ithalic",
      emotion: "happy"
    },
    why: {
      text: "因为想记录讲故事的人的故事,很奇怪吧,换句话就是他们的故事深深打动了我,我想把我所了解的记录下来,方便以后查阅,希望你喜欢!",
      speaker: "ithalic",
      emotion: "enjoy",
      options: [
        { text: "你怎么建立网站的", next: "howbuild" },
        { text: "网站都更新什么", next: "whatupdate" },
        { text: "这样啊(返回上级)", next: "aboutB" }
      ]
    },
    whyB: {
      text: "还有什么想问的吗",
      speaker: "ithalic",
      emotion: "me",
      options: [
        { text: "你怎么建立网站的", next: "howbuild" },
        { text: "网站都更新什么", next: "whatupdate" },
        { text: "没有了(返回上级)", next: "aboutB" }
      ]
    },
    whatupdate: {
      text: "目前网站还处于测试版,请不要宣传,我还要更新艺术家个人页,更新专栏,更新表格大全,更新各种样式,呃......还不少呢,不过这是我的副业,可能慢一点呢,sorry啦",
      speaker: "ithalic",
      emotion: "stare",
      options: [
        { text: "这样啊(返回上级)", next: "aboutB" }
      ]
    },
    howbuild: {
      text: "我使用nextjs,自学并使用插件和程序员的美德开发,自己绘图设计,如果有bug可以联系我哦",
      speaker: "ithalic",
      emotion: "enjoy",
      options: [
        { text: "这样啊(返回上级)", next: "whyB" }
      ]
    },
    animators: {
      text: "是呀是呀,我超~喜欢他们,动画师们都很坚强又有韧性,期待他们更新哈哈哈",
      speaker: "ithalic",
      emotion: "happy",
      options: [
        { text: "这样啊(返回上级)", next: "aboutB" }
      ]
    },
  };

  const addMessage = (node) => {
    setMessages(prev => [...prev, {
      text: node.text,
      isBot: true,
      speaker: node.speaker,
      timestamp: Date.now()
    }]);
    
    setCurrentOptions(node.options || []);
    if (node.emotion && onEmotionChange) {
      onEmotionChange(node.emotion);
    }
  };

  const handleOptionSelect = (option) => {
    setMessages(prev => [...prev, {
      text: `-${option.text}-`,
      isBot: false,
      timestamp: Date.now()
    }]);

    const nextNode = dialogData[option.next];
    if (nextNode) {
      setTimeout(() => addMessage(nextNode), 300);
    }
  };

  useEffect(() => {
    addMessage(dialogData.start);
  }, []);

  return (
    <div className={`chat-dialog ${isDarkMode ? 'dark' : ''}`}>
      <div className="messages-container">
        {messages.map((message, index) => (
          <div 
            key={`${message.timestamp}-${index}`}
            className={`message ${message.isBot ? 'bot' : 'user'}`}
          >
            <div className="message-sender">
              {message.isBot ? `${message.speaker}:` : ""}
            </div>
            <div className="message-content">
              {message.text}
            </div>
          </div>
        ))}
      </div>

      <div className="options-container">
        {currentOptions.map((option, index) => (
          <div key={index} className="option-item" onClick={() => handleOptionSelect(option)}>
            {option.text}
          </div>
        ))}
      </div>
    </div>
  );
}