import ContentLoader from "react-content-loader";


export default function Skeleton() {
    return (
        <ContentLoader
            speed={2}
            width={320}
            height={345}
            viewBox="0 0 320 345"
            backgroundColor="#d2d0d0"
            foregroundColor="#ecebeb"
            uniqueKey="skeleton"
        >
    <rect x="116" y="206" rx="3" ry="3" width="88" height="6" /> 
    <rect x="0" y="0" rx="16" ry="16" width="320" height="190" /> 
    <rect x="0" y="228" rx="13" ry="13" width="157" height="50" /> 
    <rect x="195" y="244" rx="8" ry="8" width="113" height="13" /> 
    <rect x="0" y="284" rx="13" ry="13" width="320" height="40" />
        </ContentLoader>
    )
}