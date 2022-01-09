const root = document.getElementById('root');

/////////////////////---PRODUCT IMG---/////////////////////
const product = document.createElement('img');
product.src = 'pet-rock.jpg';
product.setAttribute('id', 'product');

root.appendChild(product);

/////////////////////---INPUT CONTAINER---/////////////////////
const ratingInputSection = document.createElement('div');
ratingInputSection.setAttribute('id', 'rating_input_section');

/////////////////////---USER NAME INPUT---/////////////////////
const userNameInput = document.createElement('input');
userNameInput.setAttribute('id', 'user_name_input');
userNameInput.setAttribute('placeholder', 'Name');

/////////////////////---RATING INPUT---/////////////////////
const userRatingInput = document.createElement('input');
userRatingInput.setAttribute('id', 'user_rating_input');
userRatingInput.setAttribute('type', 'range');
userRatingInput.setAttribute('name', 'rating');
userRatingInput.setAttribute('min', '0');
userRatingInput.setAttribute('max', '10');

/////////////////////---LABEL INPUT---/////////////////////
const userRatingLabelInput = document.createElement('label');
userRatingLabelInput.setAttribute('for', 'rating');
userRatingLabelInput.innerHTML = 'Rate Us!';

/////////////////////---COMMENT INPUT---/////////////////////
const userCommentInput = document.createElement('textarea');
userCommentInput.setAttribute('id', 'user_comment_input');
userCommentInput.setAttribute('rows', '4');
userCommentInput.setAttribute('placeholder', 'Comment Your Experience!');

/////////////////////---SUBMIT BUTTON---/////////////////////
const submit = document.createElement('button');
submit.setAttribute('id', 'submit_button');
submit.setAttribute('onclick', 'postRating()');
submit.innerText = 'Submit';

/////////////////////---APPEDING CHILDREN TO INPUT SECTION---/////////////////////
ratingInputSection.appendChild(userNameInput);
ratingInputSection.appendChild(userRatingInput);
ratingInputSection.appendChild(userRatingLabelInput);
ratingInputSection.appendChild(userCommentInput);
ratingInputSection.appendChild(submit);
root.appendChild(ratingInputSection);

/////////////////////---POST RATING---/////////////////////
const ratingSection = document.createElement('section');
ratingSection.setAttribute('id', 'user_rating_section');
ratingSection.setAttribute('style', 'display: none');

const ratingSectionHeading = document.createElement('h2');
ratingSectionHeading.innerText = 'Reviews';

ratingSection.appendChild(ratingSectionHeading);
root.appendChild(ratingSection);

function postRating() {
  if (userNameInput.value && userCommentInput.value) {
    ratingSection.setAttribute('style', 'display: block');

    let newNode = document.createElement('div');
    newNode.className = 'user_rating';
    let userName = document.createElement('h3');
    userName.innerText = userNameInput.value;
    let userRating = document.createElement('h4');
    userRating.innerText = userRatingInput.value + '/10';
    let userComment = document.createElement('p');
    userComment.innerText = userCommentInput.value;

    if (parseInt(userRatingInput.value) < 6) {
      userRating.setAttribute('style', 'color: rgb(200, 60, 60);');
    }

    newNode.appendChild(userName);
    newNode.appendChild(userRating);
    newNode.appendChild(userComment);

    ratingSection.insertBefore(newNode, document.querySelector('.user_rating'));
  }
}
