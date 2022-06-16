import { useEffect } from "react";

const useScript = (url) => {
	useEffect(() => {
		const script1 = document.createElement("script");
		script1.src = url;
		script1.async = false;
		document.body.appendChild(script1);

		return () => {
			document.body.removeChild(script1);
		};
	}, [url]);
};

export default useScript;
