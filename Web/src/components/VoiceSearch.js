const startVoice=(setSearchTerm,handleSearchSubmit)=>{
    const recognition = new window.webkitSpeechRecognition();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchTerm(transcript);
      handleSearchSubmit();
    };
  
    recognition.start();
};

export default startVoice;