/**
 * Converts a string to lowercase
 *
 * '1' => 'complete'
 * '2' => 'order'
 * '3' => 'pending'
 */

function purchaseStatus (value) {
    let status = '';
    if (value == 1){
        status = 'Complete';
    }else if (value == 2){
        status = 'order';
    }else {
        status = 'pending';
    }
    return status
}

export default purchaseStatus
