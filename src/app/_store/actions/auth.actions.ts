import {Action} from '@ngrx/store';

export class SignUpPending implements Action {
  public readonly type = '[Auth] Sign up pending';

  constructor(public payload: { email: string, password: string }) {
  }
}

export class LogInPending implements Action {
  public readonly type = '[Auth] Log in pending';

  constructor(public payload: { email: string, password: string }) {
  }
}

export class CheckTokenPending implements Action {
  public readonly type = '[Auth] Check token pending';

  constructor(public payload: { token: string }) {
  }
}

export class SignUp implements Action {
  public readonly type = '[Auth] Sign up';

  constructor(public payload: { user: any, message: string }) {
  }
}

export class LogIn implements Action {
  public readonly type = '[Auth] Log in';

  constructor(public payload: { user: any, message: string }) {
  }
}

export class LogInError implements Action {
  public readonly type = '[Auth] Log in error';

  constructor(public payload: string) {
  }
}

export class LogOut implements Action {
  public readonly type = '[Auth] Log out';
}

export class ConfirmEmail implements Action {
  public readonly type = '[Auth] Confirm Email';

  constructor(public payload: string) {
  }
}

export class RequestResetPassword implements Action {
  public readonly type = '[Auth] Send reset password link';

  constructor(public payload: string) {
  }
}

export class ResetPasswordPending implements Action {
  public readonly type = '[Auth] Reset Password Pending';

  constructor(public payload: {password: string; hash: string, email: string}) {
  }
}

export class ResetPasswordSuccess implements Action {
  public readonly type = '[Auth] Reset Password Success';
}

export class ResetPasswordError implements Action {
  public readonly type = '[Auth] Reset Password Error';

  constructor(public payload: string) {
  }
}
