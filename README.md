# Fake Twitter

A very simple Twitter-like web application, assigned from [react-assignments](https://github.com/ThaddeusJiang/react-assignments/tree/main/fake-twitter), you can check it online first https://hzraevets.github.io/fake-twitter/.

### Tech-Stack

- [React](https://reactjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Ant Design](https://ant.design/)
- [React Query](https://react-query-v3.tanstack.com/)
- [React Hook Form](https://react-hook-form.com/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Storybook](https://storybook.js.org/)

Not all the 3rd-party libraries / tools which are used in this project, are listed here. Like this project is initialized with [create react app](https://create-react-app.dev/). So, feel free to explore them at your own.

### Features

- [x] Register an account (store data in LocalStorage)
- [x] Login & logout
- [x] CRUD tweets
- [x] Load more tweets via scroll down
- [x] Switch theme
- [x] 1 column in iPhone screen size, 2 columns in iPad screen size

### Setup

You should clone this project to your machine first:

```bash
git clone https://github.com/hzraevets/fake-twitter
```

enter into the project folder:

```bash
cd fake-twitter
```

and make sure you have [Node.js](https://nodejs.org/en/) installed first, then execute this command to install all dependencies:

```bash
npm install
```

### Development

You may want to add some more features into this project, or modify existing code. So you should start up a dev server locally to check what's the app be like at real-time. Just execute this command:

```bash
npm start
```

Open http://localhost:3000 to view it in the browser. The page will reload if you make edits. You will also see any lint errors in the console.

#### Add new commit

Once you finish your task and want to add a new commit, instead of using `git commit`, you should use the following command here:

```bash
npm run commit
```

### Testing

```bash
npm test
```

Launches the test runner in the interactive watch mode. See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Storybook

```bash
npm run storybook
```

Open http://localhost:6006/?path=/story/views-login--preview to view all the stories.

### Deployment

#### App

If you want to do all these work at your own:

```bash
npm run build
```

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

Also, dockerfile is provided under `ci`, you can build it to an image first:

```bash
docker build -f ci/app.dockerfile -t fake-twitter-app .
```

and then run the container:

```bash
docker run -d --name app -p 3000:80 fake-twitter-app
```

Then you can visit http://localhost:3000 to check the app.

#### Storybook

Deploy storybook is similar to deploy app.
