class CommentsController < ApplicationController
    def index
        comments = Comment.all
        render json: comments, status: :created
    end

    def create
        bet = Bet.all.find_by(id: params[:bet_id])
        comment = bet.comments.create(comment_params)
        if comment.valid?
            render json: comment, status: :created
        else
            render json: {errors: comment.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def update
        comment = @current_user.comments.find_by(id: params[:id])
        comment.update!(comment_params)
        render json: comment
    end

    def destroy
        comment = @current_user.comments.find_by(id: params[:id])
        if comment
            comment.destroy
            head :no_content
        else
            render json: {error: "Comment not found"}, status: :not_found
        end
    end

    private
    
    def comment_params
        params.permit(:user_id, :bet_id, :text)
    end
end