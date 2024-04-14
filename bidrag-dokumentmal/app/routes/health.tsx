import {LoaderFunctionArgs} from "@remix-run/node";

export async function loader({params}: LoaderFunctionArgs) {

    return new Response(null, {
        status: 200,
        headers: {
            "Content-Type": "application/pdf",
        },
    });
}