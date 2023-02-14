class ApplicationController < ActionController::API
  include ActionController::Cookies
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  before_action :authorize

  def authorize
    @current_user = User.find_by(id: session[:user_id])
    render json: { error: ["Not Authorized, Please Login or Create an Account"]}, status: :unauthorized unless @current_user
  end

  def render_unprocessable_entity_response(invalid)
    render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
  end
end
