import React, { useState, Children } from 'react';
import CodeBlock from '@theme/CodeBlock';
import MDXContent from '@theme/MDXContent';
import styles from './styles.module.scss';

interface ComparisonProps {
  title: string;
  code: string;
  lang: string;
  result?: string;
  children?: React.ReactNode;
}

export function Comparison(_props: ComparisonProps) {
  // Intentionally empty — CodeComparison reads props directly from children
  return null;
}

interface CodeComparisonProps {
  children: React.ReactNode;
}

export default function CodeComparison({ children }: CodeComparisonProps) {
  const items = Children.toArray(children).filter(
    (child): child is React.ReactElement<ComparisonProps> =>
      React.isValidElement(child) && child.type === Comparison
  );

  const hasBody = items.some(item => item.props.children);
  const hasResult = items.some(item => item.props.result);
  const count = items.length;
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={styles.grid}
      style={{ gridTemplateColumns: `repeat(${count}, 1fr)` }}
    >
      {/* Title row */}
      {items.map((item, i) => (
        <div key={`title-${i}`} className={styles.title}>
          {item.props.title}
        </div>
      ))}

      {/* Body row */}
      {hasBody && items.map((item, i) => (
        <div key={`body-${i}`} className={styles.body}>
          <MDXContent>{item.props.children}</MDXContent>
        </div>
      ))}

      {/* Code row */}
      {items.map((item, i) => (
        <div key={`code-${i}`} className={styles.code}>
          <CodeBlock language={item.props.lang}>{item.props.code}</CodeBlock>
        </div>
      ))}

      {/* Result row */}
      {hasResult && items.map((item, i) => (
        <div key={`result-${i}`} className={styles.result}>
          {item.props.result && (
            <>
              <span className={styles.resultLabel}>Result</span>
              <div className={`${styles.resultBody} ${expanded ? styles.expanded : ''}`}>
                <CodeBlock language="json">{item.props.result}</CodeBlock>
                {!expanded && <div className={styles.fade} />}
              </div>
              <button className={styles.expandBtn} onClick={() => setExpanded(prev => !prev)}>
                {expanded ? '↑ Show less' : '↓ Show more'}
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
