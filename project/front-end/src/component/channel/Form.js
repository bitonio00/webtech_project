/** @jsxImportSource @emotion/react */
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
//local
import Context from "../Context";
// Layout
import { Button, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useTheme } from "@mui/styles";

const useStyles = (theme) => {
  // See https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/OutlinedInput/OutlinedInput.js
  const borderColor =
    theme.palette.mode === "light"
      ? "rgba(0, 0, 0, 0.23)"
      : "rgba(255, 255, 255, 0.23)";
  return {
    form: {
      borderTop: `2px solid ${borderColor}`,
      padding: ".5rem",
      display: "flex",
    },
    content: {
      flex: "1 1 auto",
      "&.MuiTextField-root": {
        marginRight: theme.spacing(1),
      },
    },
    send: {},
  };
};

export default function Form({ addMessage, channel }) {
  const { oauth } = useContext(Context);
  const [content, setContent] = useState("");
  const styles = useStyles(useTheme());
  const onSubmit = async () => {
    const { data: message } = await axios.post(
      `http://localhost:3001/channels/${channel.id}/messages`,
      {
        content: content,
        author: oauth.name,
      },
      {
        headers: {
          Authorization: `Bearer ${oauth.access_token}`,
        },
      }
    );
    addMessage(message);
    setContent("");
  };
  const handleChange = (e) => {
    setContent(e.target.value);
  };
  return (
    <form css={styles.form} onSubmit={onSubmit} noValidate>
      <TextField
        id="outlined-multiline-flexible"
        label="Message"
        multiline
        maxRows={4}
        value={content}
        onChange={handleChange}
        variant="outlined"
        css={styles.content}
      />
      <div>
        <Button
          variant="contained"
          color="primary"
          css={styles.send}
          endIcon={<SendIcon />}
          onClick={onSubmit}
        >
          Send
        </Button>
      </div>
    </form>
  );
}
