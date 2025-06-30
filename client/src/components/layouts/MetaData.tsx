import { Helmet } from "react-helmet-async"

export default function MetaData({ title }: { title: string }) {
    return (
        <Helmet>
            <title>{`${title} - Ecommerce`}</title>
        </Helmet>
    )
}