import Link from 'next/link';
import Image from 'next/image';
import { ReactElement } from 'react';

export default function Custom404(): ReactElement {
    return (
        <div style={
            {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                width: "100vw",
                textAlign: "center"
            }
        }>
            <Image
                src="/404.svg"
                alt="404"
                width={300}
                height={300} 
            />
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <Link href="/">Go back to Home</Link>
        </div>
    );
}