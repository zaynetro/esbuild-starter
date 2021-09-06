import { h } from "preact";

import styles from './Hello.scss';

interface Props {
  text: string;
}

const Hello = ({ text }: Props) => (
  <main class={styles.hello}>
    <h1>{text}</h1>

    <p>There is a text above btw.</p>
  </main>
);

export default Hello;
