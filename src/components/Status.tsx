type StatusProps = {
    status : 'loading' | 'success' | 'error',
     //union of string literals can be used to restrict the possible values of a string type. In this case, we can define the status prop to only accept specific string values such as 'loading', 'success', or 'error'. This helps ensure that the Status component is used correctly and that the status prop is always one of the specified values.


}

export const Status = (props: StatusProps) => {

    let message;

    if(props.status === 'loading'){
        message = 'Loading...'
    }else if(props.status === 'success'){
        message = 'Data fetched successfully!'
    }else if(props.status === 'error'){
        message = 'Error fetching data!'    
    }

    return (
        <>
        <h2>{message}</h2>
        </>
    )
}