# Collections

[see project](https://course-project-front-rouge.vercel.app/)

###Full-stack App for personal collections managements (books, stamps, coins, cars, etc.)

- App supports registration and authentication(also authentication via Google, GitHub).
- Unauthenticated users have read-only access (they can use search, but cannot create
  collections and items, leave comments or likes).
- Authenticated users have access to everything except "admin area".
- Admin area give administrators abilities to manage users (view, block, remove, add
  to/remove from admin role). Admin see every user page and collection as its creator (
  e.g. admin can edit collection or add an item from users page).
- Collection can be managed (edit/add/remove) only by the owner (creator) or admin.
- Every page provides access to full-text search over whole site (results are represented
  as item list).
- Every user has a personal page, which allow to manage list of own collections (
  add/remove/edit) and allow to open page dedicated to given collection (that page
  contains table with filters and sorting as well as actions to cretae/remove/edit item).
- Each collection consists of: name, short description with markdown formatting, "topic" (
  from fixed set, e.g., Alcohol|Books|Cola Cans|...), optional image (stored in the cloud,
  upload with the help of drag-n-drop). Also, collection allows to define custom fields,
  which will be filled for each item in this collection.
- Each item has tags (user enters several tags with autocompletion, when user starts to
  enter tag, you show the dropdown with the words entered on the site before by all users).
- When item is opened for reading by author or opened by other user, there are comments at the bottom.
- Item has likes (no more than 1 from user per item).
- App support 2 languages: English and Russian.
- App support two visual themes - dark and light.
- App support two visual themes - dark and light.
- App support export collection to CSV-file.


### Used front-end technologies and libraries:

- React js
- Typescript
- Redux Toolkit
- Ant Design
- Axios
- SASS
- i18next
- Dayjs
- Firebase
- Formik
- React-markdown


### Used [back-end](https://github.com/Yuhee2020/course-project-back) technologies:

- nodejs
- express
- mongoose
- jsonwebtoken

### For readable code used

- prettier
- esLint

