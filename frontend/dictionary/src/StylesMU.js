import { createMuiTheme } from '@material-ui/core/styles';

export default function Theme() {
    const theme = createMuiTheme({
        palette: {
          primary: {
            light: '#757ce8',
            main: '#82b1ff',
            dark: '#002884',
            contrastText: '#fff',
          },
          secondary: {
            light: '#ff7961',
            main: '#ef9a9a',
            dark: '#ba000d',
            contrastText: '#000',
          },
        },
      });
    return theme
}