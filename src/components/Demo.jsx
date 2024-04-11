import React, { useState, useEffect } from "react";

import { copy, linkIcon, loader, tick } from "../assets"; // Import other icons from assets
import microphone from "../assets/microphone.svg"; // Import the microphone icon directly
import stopIcon from "../assets/stopIcon.svg"; // Import the stop icon directly
import { useLazyGetSummaryQuery } from "../services/article";

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });
  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false); // State to track if text-to-speech is active
  const [speechSynthesisInstance, setSpeechSynthesisInstance] = useState(null); // State to track the current speech synthesis instance
  const [lastSpokenIndex, setLastSpokenIndex] = useState(0); // State to track the last spoken index

  // RTK lazy query
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  // Load data from localStorage on mount
  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const existingArticle = allArticles.find(
      (item) => item.url === article.url
    );

    if (existingArticle) return setArticle(existingArticle);

    const { data } = await getSummary({ articleUrl: article.url });
    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];

      // update state and local storage
      setArticle(newArticle);
      setAllArticles(updatedAllArticles);
      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
    }
  };

  // copy the url and toggle the icon for user feedback
  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit(e);
    }
  };

  // Function to speak out the summary
  const speakSummary = () => {
    if (isSpeaking) {
      // If speech synthesis is active, stop it
      speechSynthesisInstance.cancel();
      setIsSpeaking(false);
    } else {
      // If speech synthesis is not active, start it or continue from the last spoken index
      const synthesis = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(article.summary.slice(lastSpokenIndex));
      synthesis.speak(utterance);
      setIsSpeaking(true);
      setSpeechSynthesisInstance(synthesis);
      utterance.onend = () => {
        setIsSpeaking(false);
        setLastSpokenIndex(article.summary.length);
      };
      utterance.onboundary = (event) => {
        setLastSpokenIndex(event.charIndex);
      };
    }
  };

  return (
    <section className="mt-16 w-full max-w-xl">
      {/* Search */}
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt="link-icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />

          <input
            type="url"
            placeholder="Paste the article link"
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            onKeyDown={handleKeyDown}
            required
            className="url_input peer"
          />
          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
          >
            <p>↵</p>
          </button>
        </form>

        {/* Browse History */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.reverse().map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className="link_card"
            >
              <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                <img
                  src={copied === item.url ? tick : copy}
                  alt={copied === item.url ? "tick_icon" : "copy_icon"}
                  className="w-[40%] h-[40%] object-contain"
                />
              </div>
              <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Display Result */}
      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
        ) : error ? (
          <p className="font-inter font-bold text-black text-center">
            Well, that wasn't supposed to happen...
            <br />
            <span className="font-satoshi font-normal text-gray-700">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                Article <span className="blue_gradient">Summary</span>
              </h2>
              <div className="summary_box">
                <p className="font-inter font-medium text-sm text-gray-700">
                  {article.summary}
                </p>
                {/* Microphone or stop icon for text-to-speech */}
                {isSpeaking ? (
                  <img
                    src={stopIcon}
                    alt="stop"
                    className="w-6 h-6 cursor-pointer"
                    onClick={speakSummary}
                  />
                ) : (
                  <img
                    src={microphone}
                    alt="microphone"
                    className="w-6 h-6 cursor-pointer"
                    onClick={speakSummary}
                  />
                )}
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
