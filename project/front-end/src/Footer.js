
/** @jsxImportSource @emotion/react */

import { AlignHorizontalCenter } from "@mui/icons-material";

const styles = {
  footer: {
    height: '50px',
    backgroundColor: 'rgba(255,255,255,.3)',
    flexShrink: 0,
    display:'flex',
    alignItem:'center',
    justifyContent:'center'
    
  },
}

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <p>This chat app was created by <u>bitonio00 mango loco</u> and <u>mat-bh red bull</u></p>
    </footer>
  );
}
