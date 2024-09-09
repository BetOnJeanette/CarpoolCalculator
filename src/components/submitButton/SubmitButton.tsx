import { Button, createTheme, ThemeProvider } from "@suid/material";

declare module '@suid/material/styles'{
    interface Palette  {
        submit: Palette["primary"]
    }

    interface PaletteOptions {
        submit?: PaletteOptions['primary']
    }
}
declare module '@suid/material/Button' {
  interface ButtonPropsColorOverrides {
    submit: true;
  }
}

const theme = createTheme({
    palette: {
        submit: {
            main: "rgb(2, 83, 12)",
            light: "rgb(122, 168, 128)",
            dark: "rgb(2, 83, 12)",
            contrastText: "gray"
        }

    }
})

interface ISubmitProps {
    onSubmit(): void;
}

export const SubmitButton = ({onSubmit}: ISubmitProps) => {
    return (
        <ThemeProvider theme={theme}>
            <Button onClick={onSubmit} variant="outlined" class="submitButton" color="submit">Submit</Button>
        </ThemeProvider>
    )
    
}