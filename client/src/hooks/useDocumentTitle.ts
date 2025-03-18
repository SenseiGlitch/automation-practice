import { useEffect } from 'react';

/**
 * Custom hook to update the document title dynamically.
 * @param title The title to set for the document.
 */
const useDocumentTitle = (title: string) => {
    useEffect(() => {
        document.title = title;
    }, [title]);
};

export default useDocumentTitle;
