/** @jsxRuntime classic */
/** @jsx jsx */
import React from "react";
import * as tui from "theme-ui";
import MDX from "@mdx-js/runtime";
import mdx from "@mdx-js/mdx";
import { MDXProvider, mdx as createElement } from "@mdx-js/react";

const {
  components,
  css,
  get,
  jsx,
  merge,
  useColorMode,
  useThemeUI,
  ...Components
} = tui;

const mdxComponents = {
  ...Components,
};
const scope = { MDXProvider };
const MarkdownViewer = ({ doc }) => {
  console.log("doc", doc);
  if (!doc) {
    return <pre>loading document...</pre>;
  }
  const { content, controllers } = doc;
  return (
    <ErrorBoundary>
      <MDX
        components={mdxComponents}
        scope={{
          ...scope,
          id: doc.id.toString(),
          ...doc.state,
          // content: doc.content,
          // state: doc.state,
          // metadata: doc.metadata,
        }}
      >
        {doc?.content?.content}
      </MDX>
    </ErrorBoundary>
  );
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
  }

  render() {
    if (this.state.error) {
      // You can render any custom fallback UI
      return <pre>{this.state.error.toString()}</pre>;
    }

    return this.props.children;
  }
}

export default MarkdownViewer;