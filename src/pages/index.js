import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";

export default function Home() {
  return (
    <Layout
      title="Frontend Interview Guide"
      description="A friendly, complete guide for frontend interviews"
    >
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "70vh",
          padding: "2rem 1rem",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: 800,
            marginBottom: "1rem",
            textAlign: "center",
          }}
        >
          Welcome to the Frontend Interview Guide
        </h1>
        <p
          style={{
            fontSize: "1.3rem",
            maxWidth: 600,
            textAlign: "center",
            marginBottom: "2.5rem",
            color: "var(--ifm-color-emphasis-700)",
          }}
        >
          A low-key, approachable, and comprehensive resource for frontend
          interview preparation. Explore coding problems, system design, theory,
          and more—all in one place.
        </p>
        <div
          style={{
            display: "flex",
            gap: "1.5rem",
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: "2rem",
          }}
        >
          <Link
            className="button button--primary button--lg"
            to="/interview/docs/frontend-interview-complete-guide"
          >
            Guide
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/interview/docs/frontend"
          >
            Frontend
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/interview/docs/leetcode"
          >
            LeetCode
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/interview/docs/theory-and-visuals"
          >
            Theory
          </Link>
        </div>
        <p
          style={{
            color: "var(--ifm-color-emphasis-500)",
            fontSize: "1rem",
            marginTop: "2rem",
            textAlign: "center",
          }}
        >
          Start with the{" "}
          <Link to="/interview/docs/interview-checklist">
            Interview Checklist
          </Link>{" "}
          or dive into{" "}
          <Link to="/interview/docs/frontend/javascript/fundamentals">
            JavaScript Fundamentals
          </Link>
          .
        </p>
      </main>
    </Layout>
  );
}
