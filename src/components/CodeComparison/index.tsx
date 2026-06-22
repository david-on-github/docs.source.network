import React, { useState } from 'react';
import CodeBlock from '@theme/CodeBlock';
import MDXContent from '@theme/MDXContent';
import styles from './styles.module.scss';

interface ComparisonItem {
  title: string;
  body?: React.ComponentType | React.ReactNode;
  code: string;
  lang: string;
  result?: string;
}

interface CodeComparisonProps {
  comparisons: ComparisonItem[];
}

function Body({ body }: { body: React.ComponentType | React.ReactNode }) {
  return (
    <MDXContent>
      {typeof body === 'function' ? React.createElement(body as React.ComponentType) : body}
    </MDXContent>
  );
}

export default function CodeComparison({ comparisons }: CodeComparisonProps) {
  const hasBody = comparisons.some(c => c.body);
  const hasResult = comparisons.some(c => c.result);
  const count = comparisons.length;
  const [expanded, setExpanded] = useState(false);
  const toggle = () => setExpanded(prev => !prev);

  return (
    <div
      className={styles.grid}
      style={{ gridTemplateColumns: `repeat(${count}, 1fr)` }}
    >
      {/* Title row */}
      {comparisons.map((c, i) => (
        <div key={`title-${i}`} className={styles.title}>
          {c.title}
        </div>
      ))}

      {/* Body row */}
      {hasBody && comparisons.map((c, i) => (
        <div key={`body-${i}`} className={styles.body}>
          {c.body && <Body body={c.body} />}
        </div>
      ))}

      {/* Code row */}
      {comparisons.map((c, i) => (
        <div key={`code-${i}`} className={styles.code}>
          <CodeBlock language={c.lang}>{c.code}</CodeBlock>
        </div>
      ))}

      {/* Result row */}
      {hasResult && comparisons.map((c, i) => (
        <div key={`result-${i}`} className={styles.result}>
          {c.result && (
            <>
              <span className={styles.resultLabel}>Result</span>
              <div className={`${styles.resultBody} ${expanded ? styles.expanded : ''}`}>
                <CodeBlock language="json">{c.result}</CodeBlock>
                {!expanded && <div className={styles.fade} />}
              </div>
              <button className={styles.expandBtn} onClick={toggle}>
                {expanded ? '↑ Show less' : '↓ Show more'}
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
