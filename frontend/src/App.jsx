import { useState, useEffect } from 'react'
import Prism from "prismjs"

import "prismjs/themes/prism-tomorrow.css"
import axios from 'axios'
import Markdown from "react-markdown"
import './App.css'

function App() {

  const [count, setCount] = useState(0)

  const [code, setCode] = useState(` function sum() {
  return 1 + 1;
}`)

  const [review, setReview] = useState(``)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    Prism.highlightAll()
  }, [])

  async function reviewCode() {

    setLoading(true)

    try {
      const response = await axios.post(
        'https://code-review-api-backend.onrender.com/ai/get-review',
        { code }
      )

      setReview(response.data)

    } catch (error) {
      setReview("Something went wrong. Please try again.")
    }

    setLoading(false)
  }

  // Format ❌ and ✅ symbols
  function SymbolText({ children }) {

    if (typeof children !== "string") {
      return children
    }

    const parts = children.split(/(❌|✅)/g)

    return (
      <>
        {parts.map((part, index) => {

          if (part === "❌") {
            return (
              <span
                key={index}
                style={{
                  color: "#ff4d6d",
                  fontWeight: "bold"
                }}
              >
                ❌
              </span>
            )
          }

          if (part === "✅") {
            return (
              <span
                key={index}
                style={{
                  color: "#22c55e",
                  fontWeight: "bold"
                }}
              >
                ✅
              </span>
            )
          }

          return part
        })}
      </>
    )
  }

  return (
    <>
      <main>

        <div className="left">

  <div className="editor-header">
    <span>Paste or write your code • Get an AI-powered review</span>
  </div>

  <div className="code">

    <textarea
      value={code}
      onChange={e => setCode(e.target.value)}
    />

  </div>

  <div
    onClick={reviewCode}
    className="review"
  >
    Review
  </div>

</div>

        <div
          className="right"
          style={{
            textAlign: "left",
            padding: "1.5rem",
            overflowY: "auto",
            overflowX: "hidden"
          }}
        >

          {loading ? (

            <div
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center"
              }}
            >

              <div className="progress">
                <div className="progress-bar"></div>
              </div>

              <p style={{ marginTop: "1rem" }}>
                Please wait 5–6 minutes while we generate your
                AI-powered code review...
              </p>

            </div>

          ) : review ? (

            <div
              style={{
                width: "100%",
                textAlign: "left",
                lineHeight: "1.6"
              }}
            >

              <Markdown
                components={{

                  h1: ({ children }) => (
                    <h1
                      style={{
                        fontWeight: "700",
                        textAlign: "left",
                        marginTop: "1rem",
                        marginBottom: "1rem",
                        fontSize: "1.8rem"
                      }}
                    >
                      {children}
                    </h1>
                  ),

                  h2: ({ children }) => {
                    const text = String(children)

                    let color = "white"

                    if (text.includes("Issues Identified")) {
                      color = "#60a5fa"
                    }

                    if (text.includes("Recommended Fix")) {
                      color = "#22c55e"
                    }

                    if (text.includes("Code Review")) {
                      color = "white"
                    }

                    return (
                      <h2
                        style={{
                          fontWeight: "700",
                          textAlign: "left",
                          marginTop: "1.5rem",
                          marginBottom: "1rem",
                          fontSize: "1.4rem",
                          color: color
                        }}
                      >
                        {children}
                      </h2>
                    )
                  },

                  h3: ({ children }) => {
                    const text = String(children)

                    let color = "white"

                    if (text.includes("Issue") || text.includes("Issues")) {
                      color = "#ff4d6d"
                    }

                    if (
                      text.includes("Best Practice") ||
                      text.includes("Recommended") ||
                      text.includes("Improvement")
                    ) {
                      color = "#22c55e"
                    }

                    if (text.includes("Key Improvements")) {
                      color = "#22c55e"
                    }

                    return (
                      <h3
                        style={{
                          fontWeight: "700",
                          textAlign: "left",
                          marginTop: "1.2rem",
                          marginBottom: "0.8rem",
                          color: color
                        }}
                      >
                        {children}
                      </h3>
                    )
                  },

                  p: ({ children }) => (
                    <p
                      style={{
                        textAlign: "left",
                        marginBottom: "1rem",
                        fontSize: "1rem",
                        color: "#f5f5f5"
                      }}
                    >
                      <SymbolText>{children}</SymbolText>
                    </p>
                  ),

                  ul: ({ children }) => (
                    <ul
                      style={{
                        textAlign: "left",
                        paddingLeft: "1.5rem",
                        marginBottom: "1rem"
                      }}
                    >
                      {children}
                    </ul>
                  ),

                  ol: ({ children }) => (
                    <ol
                      style={{
                        textAlign: "left",
                        paddingLeft: "1.5rem",
                        marginBottom: "1rem"
                      }}
                    >
                      {children}
                    </ol>
                  ),

                  li: ({ children }) => (
                    <li
                      style={{
                        textAlign: "left",
                        marginBottom: "0.8rem",
                        lineHeight: "1.6"
                      }}
                    >
                      <SymbolText>{children}</SymbolText>
                    </li>
                  ),

                  strong: ({ children }) => {
                    const text = String(children)

                    let color = "white"

                    if (
                      text.includes("Issue") ||
                      text.includes("Hardcoded") ||
                      text.includes("Missing") ||
                      text.includes("Use of")
                    ) {
                      color = "#ff4d6d"
                    }

                    if (
                      text.includes("Best Practice") ||
                      text.includes("Recommended") ||
                      text.includes("Improvement") ||
                      text.includes("Avoided") ||
                      text.includes("Enforced") ||
                      text.includes("Optimized")
                    ) {
                      color = "#22c55e"
                    }

                    return (
                      <strong
                        style={{
                          fontWeight: "700",
                          color: color
                        }}
                      >
                        {children}
                      </strong>
                    )
                  },

                  hr: () => (
                    <hr
                      style={{
                        margin: "1.5rem 0",
                        border: "none",
                        borderTop: "1px solid #777"
                      }}
                    />
                  ),

                  code: ({ children }) => (
                    <code
                      style={{
                        background: "#444",
                        color: "#f5f5f5",
                        padding: "2px 6px",
                        borderRadius: "4px",
                        fontFamily: "monospace"
                      }}
                    >
                      {children}
                    </code>
                  ),

                  pre: ({ children }) => (
                    <pre
                      style={{
                        textAlign: "left",
                        background: "#1e1e1e",
                        padding: "1rem",
                        borderRadius: "8px",
                        overflowX: "auto",
                        margin: "1rem 0",
                        whiteSpace: "pre-wrap"
                      }}
                    >
                      {children}
                    </pre>
                  )

                }}
              >
                {review}
              </Markdown>

            </div>

          ) : (

            <div className="default-review">

              <h2>Code Review</h2>

              <p>
                Write your code and click Review to get an
                AI-powered code review.
              </p>

            </div>

          )}

        </div>

      </main>
    </>
  )
}

export default App
