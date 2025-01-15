import {ComponentPropsWithoutRef} from "react";
import {Link, LinkProps} from "react-router-dom";

type buttonProps = {
    elementType: 'button';
} & ComponentPropsWithoutRef<'button'>;

type reactRouterProps = {
    elementType: 'link';
} & LinkProps;


export const Button = ({...props}: buttonProps | reactRouterProps) => {
    const {children} = props;
    if (props.elementType === 'link') {
        return (
            <>
                <Link {...props}>
                    {children}
                </Link>
            </>
        );
    }

    return (
        <>
            <button {...props}>
                {children}
            </button>
        </>
    );
};
