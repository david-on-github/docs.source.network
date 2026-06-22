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
  return null;
}

export default function CodeComparison({ children }: { children: React.ReactNode }) {
  const items = Children.toArray(children).filter(
    (child): child is React.ReactElement<ComparisonProps> =>
      React.isValidElement(child) && child.type === Comparison
  );

  const [expanded, setExpanded] = useState(false);
  const hasBody = items.some(item => item.props.children);
  const hasResult = items.some(item => item.props.result);
  const rowCount = 2 + (hasBody ? 1 : 0) + (hasResult ? 1 : 0);

  return (
    <div
      className={styles.grid}
      style={{
        gridTemplateColumns: `repeat(${items.length}, 1fr)`,
        gridTemplateRows: `repeat(${rowCount}, auto)`,
      }}
    >
      {items.map((item, i) => (
        <div key={i} className={styles.column}>
          <div className={styles.title}>{item.props.title}</div>

          {hasBody && (
            <div className={styles.body}>
              {item.props.children && (
                <MDXContent>{item.props.children}</MDXContent>
              )}
            </div>
          )}

          <div className={styles.code}>
            <CodeBlock language={item.props.lang}>{item.props.code}</CodeBlock>
          </div>

          {hasResult && (
            <div className={styles.result}>
              {item.props.result && (
                <>
                  <span className={styles.resultLabel}>Result</span>
                  <div className={`${styles.resultBody} ${expanded ? styles.expanded : ''}`}>
                    <CodeBlock language="json">{item.props.result}</CodeBlock>
                    {!expanded && <div className={styles.fade} />}
                  </div>
                  <button className={styles.expandBtn} onClick={() => setExpanded(p => !p)}>
                    {expanded ? '↑ Show less' : '↓ Show more'}
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
