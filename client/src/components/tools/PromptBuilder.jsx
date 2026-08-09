import { useState } from "react";
import { FaArrowLeft, FaCopy, FaRedo } from "react-icons/fa";
import { categories } from "./promptSuggestions";
import "../../styles/PromptBuilder.css";

function PromptBuilder() {
  const [idea, setIdea] = useState("");
  const [prompt, setPrompt] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("General");

  const [suggestions, setSuggestions] =
    useState(categories.General);

 const generatePrompt = () => {
  if (!idea.trim()) return;

  const text = idea.toLowerCase();

  let generated = "";

  // IMAGE PROMPTS

  if (selectedCategory === "Image") {

    if (
      text.includes("sunset")
    ) {
      generated =
        "A breathtaking sunset over a tropical beach with warm orange and pink skies, cinematic lighting, realistic water reflections, ultra detailed clouds, golden hour atmosphere, professional photography, 8K quality, highly realistic composition, masterpiece quality, depth of field.";
    }

    else if (
      text.includes("mountain")
    ) {
      generated =
        "Majestic snow-covered mountains during sunrise, dramatic sky, realistic landscape photography, ultra detailed textures, cinematic lighting, high contrast, breathtaking scenery, 8K resolution, photorealistic masterpiece.";
    }

    else if (
      text.includes("forest")
    ) {
      generated =
        "Dense magical forest with sun rays passing through tall trees, realistic foliage, volumetric lighting, cinematic atmosphere, ultra detailed environment, fantasy realism, 8K quality, highly immersive composition.";
    }

    else if (
      text.includes("cat")
    ) {
      generated =
        "Cute fluffy cat sitting near a window, warm natural lighting, detailed fur textures, realistic eyes, professional photography, shallow depth of field, ultra realistic, 8K quality.";
    }

    else {
      generated =
        `Create an ultra realistic image of ${idea}, cinematic lighting, professional photography, highly detailed textures, depth of field, realistic shadows, vibrant colors, masterpiece quality, 8K resolution.`;
    }
  }

  // CODING

  else if (selectedCategory === "Coding") {

    generated =
      `Build ${idea} using modern best practices.

Requirements:
• Clean architecture
• Reusable components
• Responsive design
• Error handling
• Optimized performance
• Maintainable code
• Production ready structure`;
  }

  // MARKETING

  else if (selectedCategory === "Marketing") {

    generated =
      `Create a high-converting marketing campaign for ${idea}.

Requirements:
• Strong call to action
• Customer pain points
• Emotional triggers
• Engagement strategy
• Conversion optimization
• Brand positioning`;
  }

  // WRITING

  else if (selectedCategory === "Writing") {

    generated =
      `Write professional content about ${idea} with engaging storytelling, clear structure, reader-friendly tone, detailed explanations, examples, and strong conclusion.`;
  }

  // GENERAL

  else {

    generated =
      `Create a professional and detailed version of ${idea} with clear structure, practical examples, actionable insights, and best practices.`;
  }

  setPrompt(generated);
};

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSuggestions(categories[category]);
  };

  const addSuggestion = (suggestion) => {
    if (!prompt) {
      alert("Generate a prompt first.");
      return;
    }

    setPrompt((prev) => prev + `\n• ${suggestion}`);
  };

  const copyPrompt = async () => {
    if (!prompt) return;

    try {
      await navigator.clipboard.writeText(prompt);
      alert("Prompt copied successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  const resetAll = () => {
    setIdea("");
    setPrompt("");
    setSelectedCategory("General");
    setSuggestions(categories.General);
  };

  return (
    <div className="tool-page">

      {/* Back Button */}

      <div className="back-btn">
        <a href="/">
          <FaArrowLeft />
          &nbsp; Back to Home
        </a>
      </div>

      <div className="prompt-builder-container">

        <h1>Prompt Builder AI</h1>

        <p className="tool-subtitle">
          Generate powerful prompts and enhance them
          step-by-step using smart suggestions.
        </p>

        {/* Categories */}

        <div className="category-container">

          {Object.keys(categories).map(
            (category) => (
              <button
                key={category}
                className={
                  selectedCategory === category
                    ? "category-btn active-category"
                    : "category-btn"
                }
                onClick={() =>
                  handleCategoryChange(category)
                }
              >
                {category}
              </button>
            )
          )}

        </div>

        {/* Main Layout */}

        <div className="editor-layout">

          {/* Left Panel */}

          <div className="left-panel">

            <div className="panel-title">
              Enter Your Idea
            </div>

            <textarea
              value={idea}
              onChange={(e) =>
                setIdea(e.target.value)
              }
              placeholder="Example: Create a modern landing page for a fitness startup..."
            />

            <div className="action-buttons">

              <button
                className="generate-btn"
                onClick={generatePrompt}
              >
                Generate Prompt
              </button>

              <button
                className="reset-btn"
                onClick={resetAll}
              >
                <FaRedo />
                &nbsp; Reset
              </button>

            </div>

          </div>

          {/* Right Panel */}

          <div className="right-panel">

            <div className="panel-title">
              Optimized Prompt
            </div>

            <div className="output-box">

              {prompt ? (
                <pre>{prompt}</pre>
              ) : (
                <p className="placeholder-text">
                  Your generated prompt will appear here...
                </p>
              )}

            </div>

            <button
              className="copy-btn"
              onClick={copyPrompt}
            >
              <FaCopy />
              &nbsp; Copy Prompt
            </button>

          </div>

        </div>

        {/* Suggestions */}

        <div className="suggestion-section">

          <h3>
            Prompt Enhancement Suggestions
          </h3>

          <div className="suggestion-grid">

            {suggestions.map(
              (suggestion, index) => (
                <button
                  key={index}
                  className="suggestion-chip"
                  onClick={() =>
                    addSuggestion(suggestion)
                  }
                >
                  + {suggestion}
                </button>
              )
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default PromptBuilder;