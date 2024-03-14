import { useSnackbar } from 'notistack';


const useNotification = () => {
    const { enqueueSnackbar } = useSnackbar();

    const showNotification = ({ title, variant }) => {
        if (!title || !variant) return;
        enqueueSnackbar(title, { variant, autoHideDuration: 1000 });
    };

    return { showNotification };
};

export default useNotification;
